import { FieldValues } from 'react-hook-form'
import axiosClient from './axiosInstance'

export const getCoupons = async () => {
  // const response = await axiosClient.get(`coupons`)
  // return response.data

  const mockData = {
    result: true,
    status: 200,
    message: '고객이 등록한 쿠폰 목록 조회에 성공했습니다.',
    data: [
      {
        buyerCouponId: 2, // 고객 쿠폰 id
        couponId: 2, //쿠폰id
        couponCode: '사장님이 미쳤어요', //쿠폰 코드
        discountPrice: 3000, //쿠폰 할인
        createdAt: '2023-09-05T17:52:34Z', //쿠폰 등록 시간
      },
      {
        buyerCouponId: 3,
        couponId: 3,
        couponCode: '한입충은 사절',
        discountPrice: 0,
        createdAt: '2023-09-06T03:16:27Z',
      },
    ],
  }
  return mockData.data
}

export const postCoupon = async ({ couponCode }: FieldValues) => {
  const response = await axiosClient.post(`coupons`, { couponCode })
  return response.data
}
