import CouponInfo from '../../components/order/CouponInfo'
import DeliveryInfo from '../../components/order/DeliveryInfo'
import OrderMenuInfo from '../../components/order/OrderMenuInfo'
import PaymentMethodInfo from '../../components/order/PaymentMethodInfo'
import TotalPriceInfo from '../../components/order/TotalPriceInfo'
import * as S from './Order.Styles'
import { RequestPayParams, RequestPayResponse } from '../../types/pay'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CouponDiscountAtom, FinalChargePriceAtom, UserStateAtom } from '../../atoms/orderAtoms'
import { getMypageInfo } from '../../api/mypage'
import { CartStateAtom, totalCartPriceSelector } from '../../atoms/cartAtoms'
import {
  orderItems,
  proveAfterPayment,
  proveBeforePayment,
  cancelPayment,
} from '../../api/menuOrder'

type Address = {
  addressNumber: number
  address: string
  detailAddress: string
  latitude: number
  longitude: number
  isDefault: boolean
}

type MypageInfo = {
  userNumber: number
  buyNumber: number
  sellerNumber: number | undefined
  email: string
  phoneNumber: string
  nickName: string
  businessNumber: number | undefined
  role: string
  profileImageUrl: string
  addressList: Address[]
}

const Order = () => {
  const [cartProduct, setCartProduct] = useRecoilState(CartStateAtom)
  const [orderUserInfo, setOrderUserInfo] = useRecoilState(UserStateAtom)
  const couponDiscount = useRecoilValue(CouponDiscountAtom)
  const finalChargePrice = useRecoilValue(FinalChargePriceAtom)
  const [orderId, setOrderId] = useState<number | null>(null)
  const [orderItemsReq, setOrderItemsReq] = useState<number | null>(null)

  const onClickPayment = () => {
    if (!window.IMP) return
    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init('imp37512165') // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'kcp.T0000', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: finalChargePrice, // 결제금액
      name: `${cartProduct[0]?.menuName} 외 ${
        cartProduct.length > 1 ? cartProduct.length - 1 : 0
      }건`, // 주문명
      buyer_name: orderUserInfo?.nickName, // 구매자 이름
      buyer_tel: orderUserInfo?.phoneNumber, // 구매자 전화번호
      buyer_email: orderUserInfo?.email, // 구매자 이메일
      buyer_addr: `${orderUserInfo?.addressList?.[0]?.address}, ${orderUserInfo?.addressList?.[0]?.detailAddress}`, // 구매자 주소
      buyer_postcode: String(orderUserInfo?.addressList?.[0]?.addressNumber), // 구매자 우편번호
    }

    // 주문 등록
    if (couponDiscount.buyerCouponId !== 0) {
      setOrderItemsReq(couponDiscount.buyerCouponId)
    } //잘 되려나 모르겠네요 방금 혼이나감넵
    // 화면 해보겠습니다!
    orderItems({ buyerCouponId: orderItemsReq })
      .then((response) => {
        console.log('주문등록', response.data.orderId)
        setOrderId(response.data.orderId)

        // 사전 검증
        return proveBeforePayment({ orderId: response.data.orderId }).then((response) => {
          console.log('사전검증', response)
        })

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response
    console.log(response)

    // 사후 검증
    if (success && response.imp_uid && orderId) {
      proveAfterPayment({ imp_uid: response.imp_uid, orderId })
        .then((response) => {
          console.log('사후검증', response)
          setOrderId(null)
        })
        .catch((error) => {
          console.error(error)
        })
      alert('결제 성공')
    } else {
      alert(`결제 실패: ${error_msg}`)
      // if (orderId) cancelPayment(orderId)
    }
  }

  useEffect(() => {
    getMypageInfo().then((response: MypageInfo) => {
      console.log('Order.tsx user정보 확인', response)
      setOrderUserInfo(response)
    })
  }, [])

  return (
    <>
      <DeliveryInfo /> {/* 배달 정보 */}
      <OrderMenuInfo /> {/* 주문 내역 */}
      <CouponInfo /> {/* 쿠폰 적용 */}
      <PaymentMethodInfo /> {/* 결제 수단 선택 */}
      <TotalPriceInfo /> {/* 최종 결제 금액 (배달료 명시) */}
      <S.OrderButtonWrapperDiv>
        <S.OrderButton onClick={onClickPayment}>결제하기</S.OrderButton>
      </S.OrderButtonWrapperDiv>
    </>
  )
}
export default Order
