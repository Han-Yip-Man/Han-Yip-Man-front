import { useState } from 'react'
import * as S from './PaymentMethodInfo.Styles'

const PaymentMethodInfo = () => {
  const [clicked, setClicked] = useState(false)

  return (
    <S.OuterDiv>
      <S.ItemTable>
        <S.Title>
          <S.Td1Title>결제 수단 선택</S.Td1Title>
        </S.Title>
        <S.Thead>
          <S.Td1>
            <S.Td1InnerDiv>
              {/* <S.KakaoButton>
                <S.KakaoImg
                  alt="kakaopay"
                  src="https://cdn.dominos.co.kr/domino/pc/images/sp/ico-pay_kakaopay.png"
                />
              </S.KakaoButton> */}
              {/* <S.TossButton>
                <S.TossImg
                  alt="toss"
                  src="https://cdn.dominos.co.kr/domino/pc/images/sp/ico-pay_toss.png"
                />
              </S.TossButton> */}
              <S.PortOneButton clicked={clicked} onClick={() => setClicked(!clicked)}>
                신용카드 결제
              </S.PortOneButton>
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
