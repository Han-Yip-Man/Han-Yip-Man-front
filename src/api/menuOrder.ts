import axiosClient from './axiosInstance'

type proveAfterPaymentProps = {
  imp_uid: string
  orderId: number
}

type orderItemsProps = {
  buyerCouponId: number | null
}

type proveBeforePaymentProps = {
  orderId: number
}

type CancelPaymentReturn = {
  aid: string // 요청 고유 번호
  tid: string // 결제 고유 번호
  cid: string // 가맹점 코드
  status: string // 결제 상태
  partner_order_id: string // 가맹점 주문번호(merchant_uid)
  partner_user_id: number // orderId
  payment_method_type: string // 결제방법
  amount: {
    total: number // 결제된 금액
  }
  approved_cancel_amount: {
    total: number // 취소된 금액
  }
  item_name: string // 물품명
  quantity: number // 수량
  created_at: string
  approved_at: string
}

/**
 * 결제 실패 시 취소
 * 승인 후 결제 취소
 *
 * @param orderId: 주문번호
 * @return response.data: CancelPaymentReturn
 */
export const cancelPayment = async (orderId: number): Promise<CancelPaymentReturn> => {
  // export const cancelPayment = async (
  //   imp_uid: string,
  //   merchant_uid: string,
  // ): Promise<CancelPaymentReturn> => {
  try {
    const response = await axiosClient.post(`/payments/iamport/cancel`, orderId)
    // const response = await axiosClient.post(`/payments/iamport/cancel`, { imp_uid, merchant_uid })
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error)
  }
  return {} as CancelPaymentReturn
}

// 주문등록
export const orderItems = async (payload: orderItemsProps) => {
  const response = await axiosClient.post(`/orders`, payload)
  return response
}

// 사전검증
export const proveBeforePayment = async (payload: proveBeforePaymentProps) => {
  const response = await axiosClient.post(`/payments/prepare`, payload)
  return response
}

// 사후검증
export const proveAfterPayment = async (payload: proveAfterPaymentProps) => {
  // console.log(payload)
  const response = await axiosClient.post(`/payments/complete`, payload)
  return response
}
