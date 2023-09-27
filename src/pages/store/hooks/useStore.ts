import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../../api/axiosInstance'
import { StoreDetail } from '../types'

const getStoreDetail = async (shopId: any | undefined): Promise<StoreDetail> => {
  const infoResponse = await axiosClient.get(`/buyer-shops/${shopId}/info`)
  const rvAvgResponse = await axiosClient.get(`/buyer-shops/${shopId}/review-average`)

  const returnValue = {
    storeDetail: {
      info: infoResponse.data,
      rvAvg: rvAvgResponse.data,
    },
  }

  return returnValue
}

const useStore = (storeId: number) => {
  const { data, isLoading } = useQuery(['stores', storeId], () => getStoreDetail(storeId))

  return { data, isLoading }
}

export default useStore
