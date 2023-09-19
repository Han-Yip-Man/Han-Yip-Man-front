import axiosClient from './axiosInstance'

export const getSellerOrderList = async (shopId: number) => {
  const response = await axiosClient.get(`/seller-shops/shops/${shopId}/orders`)

  return response.data
}
