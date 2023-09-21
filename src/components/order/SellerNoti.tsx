import styled from '@emotion/styled'
import { extractTime } from '../../utils/extractTime'

const SellerNoti = (props: any) => {
  return (
    <>
      <OrderDesc>
        <OrderHeader>
          <OrderId>3216546545632146orderUID</OrderId>
          <OrderTime>{extractTime('2023-09-20T17:44:55Z')}</OrderTime>
        </OrderHeader>
        <OrderTitle>페페로니 피자 외 3건</OrderTitle>
        <OrderAddrWrap>
          <OrderAddr1>경기도 성남시 분당구 백현동 123</OrderAddr1>
          <OrderAddr2>판교역 3번 출구</OrderAddr2>
        </OrderAddrWrap>
        <OrderFootWrap>
          <OrderTotal>146,000원</OrderTotal>
          <OrderPayment>결제 수단: 카드</OrderPayment>
        </OrderFootWrap>
      </OrderDesc>
      <BtnWrap>
        <BtnAWrap>
          <Btn onClick={() => props.onClose(props.t.id)}>수락</Btn>
        </BtnAWrap>
        <BtnDWrap>
          <Btn>거절</Btn>
        </BtnDWrap>
      </BtnWrap>
    </>
  )
}

export default SellerNoti

const OrderDesc = styled.div`
  /* background-color: gray; */
  display: grid;
  grid-template-rows: 1fr 1fr 2fr 1fr;
  justify-items: start;
`

const OrderHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  place-items: center;
`

const OrderId = styled.div`
  border-radius: 30px;
  border: 1px solid black;
  padding: 7px;
`

const OrderTime = styled.div``

const OrderTitle = styled.h1`
  display: grid;
  align-items: center;
  font-size: 21px;
  padding-top: 5px;
`

const OrderAddrWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  color: white;
`

const OrderAddr1 = styled.div`
  align-self: center;
`

const OrderAddr2 = styled.div`
  align-items: center;
`

const OrderFootWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const OrderTotal = styled.div`
  align-self: center;
  color: purple;
`

const OrderPayment = styled.div`
  align-self: center;
`

const BtnWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
`

const BtnAWrap = styled.div``

const BtnDWrap = styled.div`
  &&& > button {
    background-color: red;
  }
`

const Btn = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: green;
  color: white;
  font-family: inherit;
  font-size: 21px;
`
