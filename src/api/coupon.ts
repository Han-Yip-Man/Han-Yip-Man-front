import axiosClient from './axiosInstance'

type MyCouponList = {
  buyerCouponId: number
  couponCode: string
  couponId: number
  createdAt: string
  discountPrice: number
  enabled: boolean
}

type CouponCode = {
  couponCode: string
}

export const getMyCounpon = async (): Promise<MyCouponList[]> => {
  const response = await axiosClient.get(`/coupons`)
  return response.data
}

export const registerCoupon = async (payload: CouponCode) => {
  const response = await axiosClient.post(`/coupons`, payload)
  return response
}
