import axiosClient from './axios'

export const addShop = async (payload: FormData) => {
  try {
    const response = await axiosClient.post('/api/seller-shops', payload)
    return response.data
  } catch (error) {
    console.error('에러', error)
  }
}

export const getShop = async () => {
  try {
    const response = await axiosClient.get('/api/seller-shops/shops')
    return response.data
  } catch (error) {
    console.error('조회 실패', error)
  }
}
