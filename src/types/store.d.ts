declare interface StoreDetail {
  avgRating: number
  deliveryPrice: number
  deliveryTime: number
  distance: number
  minOrderPrice: number
  reviewCount: number
  shopDescription: string
  shopId: number
  shopName: string
  thumbnailUrl: string
}

declare interface ResponseData<T> {
  result?: boolean
  status?: number
  message?: string
  data?: T
}

declare type StoreListResponse = {
  shopLists: StoreDetail[]
  nextCursor: number | undefined
}

declare interface ICategory {
  categoryName: CategoryType
  categoryId: number
}
