import * as S from './StoreList.style'
import StoreCard from '../StoreCard'
import { Box } from '@mui/material'
import { useIntersection } from '../../../common/hooks'
import StoreCardSkeleton from '../StoreCardSkeleton'
import useCategoryMainData from '../../hooks/useCategoryMainData'
import { LoadingSpinner } from '../../../common/components'

interface Props {
  currentCategory: ICategory
  debouncedKeyword: string
  currentFilter: FilterType
}

const StoreList = ({ currentCategory, debouncedKeyword, currentFilter }: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useCategoryMainData({
    debouncedKeyword,
    currentCategory,
    currentFilter,
  })

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
