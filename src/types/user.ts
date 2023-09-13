type ROLE_USER = 'user'
type ROLE_ADMIN = 'admin'

export const UserRole: ROLE_USER = 'user'
export const AdminRole: ROLE_ADMIN = 'admin'

export type UserRole = ROLE_USER | ROLE_ADMIN

export interface UserInfo {
  name: string
  roles: UserRole[]
}

export interface User {
  address: string
  created_at: string
  email: string
  exp: number
  iat: number
  idx: number
  member_img: string
  nickname: string
  phone_number: string
  sub: string
  updated_at: string
}

export interface AddShopType {
  address?: string // 필수
  addressDetail?: string // 선택적
  bannerImage?: File // 선택적
  businessNumber?: string // 필수
  categoryId: number // 필수
  latitude: number // 필수
  longitude: number // 필수
  minOrderPrice: number // 필수
  shopName: string // 필수
  shopPhone: string // 필수
  showDescription: string // 필수
  thumbnailImage?: File // 선택적
  coordinates?: {
    latitude: string | undefined
    longitude: string | undefined
  } | null
}

export interface FormDataType {
  email?: string
  password?: string
  password_confirm?: string
  phoneNumber?: string
  nickname?: string
  address?: string
  BusinessNumber?: string
  storeName?: string
  storePhone?: string
  category?: string
  businessNumber?: string
  minimumOrderAmount?: string
  mainImage?: File
  bannerImage?: File
  menuCategory?: string
  zonecode?: string
  detailaddress?: string
  [key: string]: any
}
