import axiosClient from './axios'
import { AddShopType } from '../types/user'

export const addShop = async (payload: AddShopType) => {
  try {
    const response = await axiosClient.post('/api/seller-shops', payload)
    return response.data
  } catch (error) {
    console.error('Adding shop failed:', error)
  }
}
