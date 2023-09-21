import { atom } from 'recoil'

type MypageInfo = {
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

type Address = {
  addressNumber: number
  address: string
  detailAddress: string
  latitude: number
  longitude: number
  isDefault: boolean
}

const myPageInfo: MypageInfo = {
  userNumber: 0,
  buyNumber: 0,
  sellerNumber: undefined,
  email: '',
  phoneNumber: '',
  nickName: '',
  businessNumber: undefined,
  role: '',
  profileImageUrl: '',
  addressList: [],
}

export const UserStateAtom = atom({
  key: 'orderUserState',
  default: myPageInfo,
})

export const CouponDiscountAtom = atom({
  key: 'couponDiscount',
  default: { discountPrice: 0, buyerCouponId: 0 },
})

export const FinalChargePriceAtom = atom({
  key: 'finalChargePrice',
  default: 0,
})

export const orderShopid = atom<number | null>({
  key: 'orderShopid',
  default: null,
})
