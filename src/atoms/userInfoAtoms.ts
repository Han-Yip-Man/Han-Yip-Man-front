import { atom, selector } from 'recoil'
import jwtDecode from 'jwt-decode'

interface UserInfoType {
  email: string
  exp: number
  iat: number
  nickname: string
  role: string
  sub: string
  userIdx: number
}

export const tokenState = atom({
  key: 'token',
  default: sessionStorage.getItem('accessToken') || null,
})

export const userInfo = selector<UserInfoType | null>({
  key: 'userInfo',
  get: ({ get }) => {
    const token = get(tokenState)
    return token ? jwtDecode(token) : null
  },
})
