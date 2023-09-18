import * as S from './StoreList.style'
import StoreCard from './StoreCard'
import LoadingSpinner from '../common/LoadingSpinner'
import { Box } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '../../hooks'
import StoreCardSkeleton from './StoreCardSkeleton'

interface Props {
  currentCategory: ICategory
  debouncedKeyword: string
  currentFilter: string
  fetchData: ({ pageParam }: { pageParam?: null | undefined }) => Promise<StoreListResponse>
}

const StoreList = ({ currentCategory, debouncedKeyword, currentFilter, fetchData }: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
    ['category', currentCategory.categoryName, debouncedKeyword, currentFilter],
    fetchData,
    {
      getNextPageParam: (lastPage: StoreListResponse) => {
        return lastPage.nextCursor
      },
      useErrorBoundary: true,
      staleTime: 50000,
      cacheTime: 50000,
    },
  )

  const ref = useIntersection(fetchNextPage, hasNextPage)

  return (
    <>
      {isFetching && !data ? (
        <S.LoadingWrap>
          <LoadingSpinner />
        </S.LoadingWrap>
      ) : (
        <Box sx={{ width: 1, mb: '70px' }}>
          <S.Wrap>
            {data?.pages.map((page) =>
              page.shopLists.map((shop: StoreDetail) => <StoreCard key={shop.shopId} {...shop} />),
            )}
            {isFetchingNextPage &&
              Array.from({ length: 10 }, (_, i) => i + 1).map((i) => <StoreCardSkeleton key={i} />)}
            <S.Observer ref={ref}></S.Observer>
          </S.Wrap>
        </Box>
      )}
    </>
  )
}

export default StoreList
