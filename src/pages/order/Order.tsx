import CouponInfo from '../../components/order/CouponInfo'
import DeliveryInfo from '../../components/order/DeliveryInfo'
import OrderMenuInfo from '../../components/order/OrderMenuInfo'
import PaymentMethodInfo from '../../components/order/PaymentMethodInfo'
import TotalPriceInfo from '../../components/order/TotalPriceInfo'
import * as S from './Order.Styles'

const Order = () => {
  return (
    <>
      <DeliveryInfo /> {/* 배달 정보 */}
      <OrderMenuInfo /> {/* 주문 내역 */}
      <CouponInfo /> {/* 쿠폰 적용 */}
      <PaymentMethodInfo /> {/* 결제 수단 선택 */}
      <TotalPriceInfo /> {/* 최종 결제 금액 (배달료 명시) */}
      <S.OrderButtonWrapperDiv>
        <S.OrderButton>결제하기</S.OrderButton>
      </S.OrderButtonWrapperDiv>
    </>
  )
}
export default Order

// 노션:
// 현재 설정된 배달 주소,
// 배달 예상 소요 시간,
// 휴대폰 번호,
// 주문 요청 사항,
// -----------------------------------배달정보
// 쿠폰 적용,
// 결제 방식,
// 배달료,
// 실제 결제될 가격
