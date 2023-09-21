import * as S from './StoreList.style'
import StoreCard from './StoreCard'
import LoadingSpinner from '../common/LoadingSpinner'
import { Box } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '../../hooks'
import StoreCardSkeleton from './StoreCardSkeleton'
import { useNavigate } from 'react-router'

interface Props {
  currentCategory: ICategory
  debouncedKeyword: string
  currentFilter: string
  fetchData: (pageParam: CursorParams) => Promise<StoreListResponse>
}

const StoreList = ({ currentCategory, debouncedKeyword, currentFilter, fetchData }: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
    ['category', currentCategory.categoryName, debouncedKeyword, currentFilter],
    (pageParam: any) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage: StoreListResponse) => {
        if (!lastPage.nextCursorId) {
          return false
        }
        return { nextCursorId: lastPage.nextCursorId, nextCursorValue: lastPage.nextCursorValue }
      },
      useErrorBoundary: true,
      staleTime: 50000,
      cacheTime: 50000,
    },
  )

  const ref = useIntersection(fetchNextPage, hasNextPage)
  const navigate = useNavigate()

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
              page.shopLists.map((shop: StoreDetail) => (
                <StoreCard key={shop.shopId} {...shop} shopId={shop.shopId} />
              )),
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
