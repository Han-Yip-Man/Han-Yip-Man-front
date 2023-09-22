import * as S from './PaymentMethodInfo.Styles'

import { RequestPayParams, RequestPayResponse } from '../../types/pay'
// import { Ordercomplete } from '../../api/order'
import { useRecoilValue } from 'recoil'

const PaymentMethodInfo = () => {
  const onClickPayment = () => {
    if (!window.IMP) return
    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init('imp37512165') // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'kcp.T0000', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `0177c1f5-8435-446d-8fac-a9ef9c233290`, // 주문번호
      amount: 2400, // 결제금액
      name: '한입만 테스트 결제', // 주문명
      buyer_name: '홍길동', // 구매자 이름
      buyer_tel: '010-1234-1234', // 구매자 전화번호
      buyer_email: 'example@example.com', // 구매자 이메일
      buyer_addr: '무지개동 개나리아파트', // 구매자 주소
      buyer_postcode: '01234', // 구매자 우편번호
    }

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback)
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response

    console.log(response.imp_uid)

    if (success) {
      // Ordercomplete({ imp_uid: response.imp_uid, orderId: orderid }).then((response) => {
      //   console.log('성공')
      //   console.log(response)
      // })
      // alert(response)
    } else {
      alert(`결제 실패: ${error_msg}`)
    }
  }

  return (
    <S.OuterDiv>
      <S.ItemTable>
        <S.Title>
          <S.Td1Title>결제 수단 선택</S.Td1Title>
        </S.Title>
        <S.Thead>
          <S.Td1>
            <S.Td1InnerDiv>
              <S.KakaoButton>
                <S.KakaoImg
                  alt="kakaopay"
                  src="https://cdn.dominos.co.kr/domino/pc/images/sp/ico-pay_kakaopay.png"
                />
              </S.KakaoButton>
              {/* <S.TossButton>
                <S.TossImg
                  alt="toss"
                  src="https://cdn.dominos.co.kr/domino/pc/images/sp/ico-pay_toss.png"
                />
              </S.TossButton> */}
              <S.PortOneButton onClick={onClickPayment}>신용카드 결제</S.PortOneButton>
            </S.Td1InnerDiv>
          </S.Td1>
        </S.Thead>
      </S.ItemTable>
    </S.OuterDiv>
  )
}
export default PaymentMethodInfo

// cto 님 코드 참고 //

// import { RequestPayParams } from "iamport-typings";
// import axiosClient from "./axios";

// const currentTime = Date.now();

// const requestPay = (point: number) => {
//   window.IMP?.init("imp28437666");

//   const params: RequestPayParams = {
//     // param
//     pg: `kcp.${"A52CY"}`,
//     pay_method: "card",
//     merchant_uid: `roupang_${currentTime}`,
//     name: `포인트 ${point} 구매`,
//     amount: 100, // <----- 이게 지금 결제금액 이건 pg사에 보내는 거라 서버랑 아무 상관이 없다
//     buyer_email: "gildong@gmail.com",
//     buyer_name: "홍길동",
//     buyer_tel: "010-4242-4242",
//     buyer_addr: "서울특별시 강남구 신사동",
//     buyer_postcode: "01181",
//   };
//   window.IMP?.request_pay(params, (rsp) => {

// 사후 검증 요청을 백에 보낸다.
// (사전 검증 금액과 사후 검증 금액 일치 하는지 확인해서 답을 준다.)
//     if (rsp.success) {
//       axiosClient
//         .post("/point/charge", {
//           충전포인트: point, // <---- 이게 지금 서버에 보내는 거 이거 포인트
//           "결제 금액": ~~(point * 0.1), // <----- 서버에 보내는 결제금액
//           "결제수단 번호": 1, // <--- 결제 방법
//         })
//         .then((res) => {
//           console.log(res);
//         });
//     } else {
//       console.log(rsp);
//       console.log("실패");
//     }
//   });
// };

// export default requestPay;
