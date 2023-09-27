import axiosClient from '../../../api/axiosInstance'
import { StoreDetail, StoreMenus, StoreReviews } from '../types'

export const getStoreDetail = async (shopId: any | undefined): Promise<StoreDetail> => {
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

export const getStoreMenus = async (shopId: string | undefined): Promise<StoreMenus> => {
  const menuResponse = await axiosClient.get(`/buyer-shops/${shopId}/menus`)
  return menuResponse.data
}

export const getStoreReviews = async (shopId: string | undefined): Promise<StoreReviews> => {
  const defaultSize = 2
  const reviewResponse = await axiosClient.get(`/buyer-shops/${shopId}/reviews?size=${defaultSize}`)
  return reviewResponse.data
}

export const getStoreReviewsInf = async (shopId: string | undefined, cursor: string) => {
  const size = 2
  const reviewInfResponse = await axiosClient.get(
    `/buyer-shops/${shopId}/reviews?cursor=${cursor}&size=${size}`,
  )
  return reviewInfResponse.data
}
