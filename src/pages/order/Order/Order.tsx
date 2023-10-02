import DeliveryInfo from '../DeliveryInfo/DeliveryInfo'
import OrderMenuInfo from '../OrderMenuInfo/OrderMenuInfo'
import CouponInfo from '../CouponInfo/CouponInfo'
import PaymentMethodInfo from '../PaymentMethodInfo/PaymentMethodInfo'
import TotalPriceInfo from '../TotalPriceInfo/TotalPriceInfo'
import * as S from './Order.Styles'
import { RequestPayParams, RequestPayResponse } from '../../../types/pay'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  orderItems,
  proveAfterPayment,
  proveBeforePayment,
  cancelPayment,
} from '../../../api/menuOrder'
import { useRouter } from '../../common/hooks'
import {
  CartStateAtom,
  CouponDiscountAtom,
  FinalChargePriceAtom,
  UserStateAtom,
} from '../../../atoms'
import { getMypageInfo } from '../../customerMypage/hooks/mypage'

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
  const { routeTo } = useRouter()

  const [cartProduct, setCartProduct] = useRecoilState(CartStateAtom)
  const [orderUserInfo, setOrderUserInfo] = useRecoilState(UserStateAtom)
  const couponDiscount = useRecoilValue(CouponDiscountAtom)
  const finalChargePrice = useRecoilValue(FinalChargePriceAtom)
  // const [orderId, setOrderId] = useState<number | null>(null)
  const [orderItemsReq, setOrderItemsReq] = useState<number | null>(null)

  let orderId: number | null = 0

  const couponId = couponDiscount.buyerCouponId === 0 ? null : couponDiscount.buyerCouponId

  const onClickPayment = async () => {
    if (!window.IMP) return
    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init('imp01250285') // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'html5_inicis.INIpayTest', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: 'card', // 결제수단
      merchant_uid: ``, // 주문번호
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

    await orderItems({ buyerCouponId: couponId })
      .then(async (response) => {
        console.log('주문등록', response.data.orderId)
        // setOrderId(response.data.orderId)
        orderId = response.data.orderId
        // 사전 검증
        const resp = await proveBeforePayment({ orderId: response.data.orderId })
        console.log('사전검증', resp.data.response.merchant_uid)
        data.merchant_uid = resp.data.response.merchant_uid
      })
      .catch((error) => {
        console.error(error)
      })
    /* 4. 결제 창 호출하기 */
    await console.log('콜백으로 던진 페이로드', data)
    await IMP.request_pay(data, callback)
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
          // setOrderId(null)
        })
        .catch((error) => {
          console.error(error)
        })
      alert('결제 성공')
      routeTo('/') // 메인페이지로 이동
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
