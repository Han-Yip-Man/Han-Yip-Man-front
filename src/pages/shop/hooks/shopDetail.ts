import axiosClient from '../../../api/axiosInstance'
import { ShopDetail, ShopMenus, ShopReviews } from '../types'

export const getShopDetail = async (shopId: any | undefined): Promise<ShopDetail> => {
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

export const getShopMenus = async (shopId: string | undefined): Promise<ShopMenus> => {
  const menuResponse = await axiosClient.get(`/buyer-shops/${shopId}/menus`)
  return menuResponse.data
}

export const getShopReviews = async (shopId: string | undefined): Promise<ShopReviews> => {
  const defaultSize = 2
  const reviewResponse = await axiosClient.get(`/buyer-shops/${shopId}/reviews?size=${defaultSize}`)
  return reviewResponse.data
}

export const getShopReviewsInf = async (shopId: string | undefined, cursor: string) => {
  const size = 2
  const reviewInfResponse = await axiosClient.get(
    `/buyer-shops/${shopId}/reviews?cursor=${cursor}&size=${size}`,
  )
  return reviewInfResponse.data
}
