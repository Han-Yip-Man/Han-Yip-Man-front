export type StoreDetail = {
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

export type menuInfo = {
  menuDescription: string
  menuDiscountPrice: number
  menuId: number
  menuName: string
  menuPrice: number
  menuThumbnailUrl: string
}

export type menuGroup = {
  menuByMenuGroupList: menuInfo[]
  menuGroupId: number
  menuGroupName: string
}

export type StoreMenus = menuGroup[]

export type StoreReview = {
  userId: number
  nickName: string
  reviewContent: string
  reviewScore: string
  createdAt: string
  reviewImageUrl: string
}

export type StoreReviews = {
  cursor: string
  shopReviewsList: StoreReview[]
}
