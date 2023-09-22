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

declare interface CursorParams {
  nextCursorId: number | null
  nextCursorValue: string | null
}

declare interface StoreListResponse extends CursorParams {
  shopLists: StoreDetail[]
}

declare interface ICategory {
  categoryName: CategoryType
  categoryId: number
}

declare type OrderState = 'CANCELED' | 'TAKEOVER' | 'COOKING' | 'DELIVERY' | 'COMPLETE' | 'PAID'

declare interface AlarmData {
  address: string
  addressDetail: string
  menuNames: string
  orderId: number
  orderUId: string
  orderStatus: OrderState
  orderedTime: string
  paymentProvider: string
  totalAmount: number
}
