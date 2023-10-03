import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../../api/axiosInstance'
import { ShopDetail } from '../types'
import { queryKeys } from '../../../react-query/querykey'

const getShopDetail = async (shopId: any | undefined): Promise<ShopDetail> => {
  const infoResponse = await axiosClient.get(`/buyer-shops/${shopId}/info`)
  const rvAvgResponse = await axiosClient.get(`/buyer-shops/${shopId}/review-average`)

  const returnValue = {
    shopDetail: {
      info: infoResponse.data,
      rvAvg: rvAvgResponse.data,
    },
  }

  return returnValue
}

const useShop = (shopId: number) => {
  const { data, isLoading } = useQuery([queryKeys.shop, shopId], () => getShopDetail(shopId))

  return { data, isLoading }
}

export default useShop
