import { useInfiniteQuery } from '@tanstack/react-query'
import axiosClient from '../../../api/axiosInstance'
import { ShopReviews } from '../types'
import { queryKeys } from '../../../react-query/querykey'

const getShopReviews = async (shopId: string | undefined): Promise<ShopReviews> => {
  const defaultSize = 2
  const reviewResponse = await axiosClient.get(`/buyer-shops/${shopId}/reviews?size=${defaultSize}`)
  return reviewResponse.data
}
const getShopReviewsInf = async (shopId: number, cursor: string) => {
  const size = 2
  const reviewInfResponse = await axiosClient.get(
    `/buyer-shops/${shopId}/reviews?cursor=${cursor}&size=${size}`,
  )
  return reviewInfResponse.data
}

const useReview = (shopId: number) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [queryKeys.reviewInf, shopId],
    queryFn: ({ pageParam = '' }) => getShopReviewsInf(shopId, pageParam),
    getNextPageParam: (lastPage) => lastPage.cursor,
  })
  return { data, fetchNextPage, hasNextPage, isFetching }
}

export default useReview
