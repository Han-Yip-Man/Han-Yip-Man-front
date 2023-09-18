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

export const getStoreMenus = async (shopId: number): Promise<StoreMenus> => {
  const menuResponse = await axiosClient.get(`/buyer-shops/${shopId}/menus`)
  return menuResponse.data
}
