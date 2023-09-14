import { atom, selector } from 'recoil'
import jwtDecode from 'jwt-decode'

export const tokenState = atom({
  key: 'token',
  default: sessionStorage.getItem('accessToken') || null,
})

export const userInfo = selector({
  key: 'userInfo',
  get: ({ get }) => {
    const token = get(tokenState)
    return token ? jwtDecode(token) : null
  },
})
