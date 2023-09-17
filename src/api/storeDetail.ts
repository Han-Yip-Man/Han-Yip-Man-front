import axiosClient from './axiosInstance'

type StoreDetail = {
  storeDetail: {
    info: {
      bannerUrl: string
      description: string
      shopAddressResponse: {
        address: string
        detailAddress: string
        latitude: number
        longitude: number
      }
      shopName: string
    }
    rvAvg: number
  }
}

type menuInfo = {
  menuDescription: string
  menuDiscountPrice: number
  menuId: number
  menuName: string
  menuPrice: number
  menuThumbnailUrl: string
}

type menuGroup = {
  menuByMenuGroupList: menuInfo[]
  menuGroupId: number
  menuGroupName: string
}

type StoreMenus = menuGroup[]

type StoreReview = {
  userId: number
  nickName: string
  reviewContent: string
  reviewScore: string
  createdAt: string
  reviewImageUrl: string
}

type StoreReviews = {
  cursor: string
  shopReviewsList: StoreReview[]
}

export const getStoreDetail = async (shopId: string | undefined): Promise<StoreDetail> => {
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
