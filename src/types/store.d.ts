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

declare type StoreListResponse = ResponseData<{
  shopLists: StoreDetail[]
  nextCursor?: number
}>

declare type QueryResponse = {
  pages: Array<
    ResponseData<{
      shopLists: StoreDetail[]
      nextCursor?: number
    }>
  >
  pageParams: (string | null)[]
}
