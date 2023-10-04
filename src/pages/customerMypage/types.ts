export type Address = {
  addressNumber: number
  address: string
  detailAddress: string
  latitude: number
  longitude: number
  isDefault: boolean
}

export type MypageInfo = {
  userNumber: number
  buyNumber: number
  sellerNumber: number | undefined
  email: string
  phoneNumber: string
  nickName: string
  businessNumber: number | undefined
  role: string
  profileImageUrl: string
  addressList: Address[]
}

export type ReviewResponse = {
  message: string
  result: boolean
  status: number
}

export type AddressFormValues = {
  address: string
  detailAddress: string
  latitude: number
  longitude: number
}

export type Order = {
  orderId: number
  orderUid: string
  shopName: string
  shopId: number // 가게ID
  bannerImg: string
  menus: string[]
  options: string[]
  orderDateTime: string
  orderStatus: string
}

export type Orders = {
  content: Order[]
  cursor: number
  size: number
  end: boolean
}
