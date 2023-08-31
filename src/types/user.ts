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
