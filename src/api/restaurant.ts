import axiosClient from './axios'
import { AddMenuGroups } from '../types/restaurantsAtom'

// 가게등록
export const addShop = async (payload: FormData) => {
  try {
    const response = await axiosClient.post('/api/seller-shops', payload)
    return response.data
  } catch (error) {
    console.error('에러', error)
  }
}

//내 가게들 조회
export const getShop = async () => {
  try {
    const response = await axiosClient.get('/api/seller-shops/shops')
    return response.data
  } catch (error) {
    console.error('조회 실패', error)
  }
}

//가게 상세 조회
export const getShopDetail = async (payload: number | null) => {
  try {
    const response = await axiosClient.get(`/api/seller-shops/shops/${payload}`)
    return response.data
  } catch (error) {
    console.error('조회 실패', error)
  }
}

//가게 메뉴 대분류 조회
export const getMenuGroups = async (payload: number | null) => {
  try {
    const response = await axiosClient.get(`/api/seller-shops/menu-groups/${payload}`)
    return response.data
  } catch (error) {
    console.error('조회 실패', error)
  }
}

//가게 대분류 등록
export const addMenuGroups = async (payload: AddMenuGroups) => {
  try {
    const response = await axiosClient.post(`/api/seller-shops/menu-groups/${payload.shop_id}`, {
      menuGroupName: payload.menuGroupName,
    })
    return response.data
  } catch (error) {
    console.error('조회 실패', error)
  }
}
