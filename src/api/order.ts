import axiosClient from './axiosInstance'

export const getSellerOrderList = async (shopId: number) => {
  const response = await axiosClient.get(`/seller-shops/shops/${shopId}/orders`)

  return response.data
}

//주문등록
export const OrderEntry = async (buyerCouponId: number | null) => {
  const response = await axiosClient.post(`/orders`, { buyerCouponId: null })

  return response.data
}

//사전
export const Orderprepare = async (orderId: number) => {
  const response = await axiosClient.post(`/payments/prepare`, { orderId: orderId })

  return response.data
}

//사후
// export const Ordercomplete = async (payload) => {
//   const response = await axiosClient.post(`/payments/complete`, payload)

//   return response.data
// }
