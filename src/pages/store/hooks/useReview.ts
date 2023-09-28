import { useInfiniteQuery } from '@tanstack/react-query'
import axiosClient from '../../../api/axiosInstance'
import { StoreReviews } from '../types'
import { queryKeys } from '../../../react-query/querykey'

const getStoreReviews = async (shopId: string | undefined): Promise<StoreReviews> => {
  const defaultSize = 2
  const reviewResponse = await axiosClient.get(`/buyer-shops/${shopId}/reviews?size=${defaultSize}`)
  return reviewResponse.data
}
const getStoreReviewsInf = async (shopId: number, cursor: string) => {
  const size = 2
  const reviewInfResponse = await axiosClient.get(
    `/buyer-shops/${shopId}/reviews?cursor=${cursor}&size=${size}`,
  )
  return reviewInfResponse.data
}

const useReview = (storeId: number) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [queryKeys.reviewInf, storeId],
    queryFn: ({ pageParam = '' }) => getStoreReviewsInf(storeId, pageParam),
    getNextPageParam: (lastPage) => lastPage.cursor,
  })
  return { data, fetchNextPage, hasNextPage, isFetching }
}

export default useReview
