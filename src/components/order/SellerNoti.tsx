import styled from '@emotion/styled'
import { extractTime } from '../../utils/extractTime'
import { useSocketContext } from '../../pages/common/hooks'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  t: any
  onClose: (id: string) => void
  data: AlarmData
}

const SellerNoti = ({ data, t, onClose }: Props) => {
  const { socket } = useSocketContext()
  const qc = useQueryClient()

  const onClick = (action: string) => {
    const movedItem = {
      orderId: data.orderId,
      orderStatus: action === 'accept' ? 'TAKEOVER' : 'CANCELED',
      orderSequence: 0,
    }
    socket?.emit('send_order_status_change', movedItem, () => {
      qc.invalidateQueries(['orderList'])
    })
    onClose(t.id)
  }

  return (
    <CardWrap>
      <OrderDesc>
        <OrderHeader>
          <OrderId>{data.orderUId}</OrderId>
          <OrderTime>{extractTime(data.orderedTime)}</OrderTime>
        </OrderHeader>
        <OrderTitle>{data.menuNames}</OrderTitle>
        <OrderAddrWrap>
          <OrderAddr1>{data.address}</OrderAddr1>
          <OrderAddr2>{data.addressDetail}</OrderAddr2>
        </OrderAddrWrap>
        <OrderFootWrap>
          <OrderTotal>{data.totalAmount.toLocaleString()}원</OrderTotal>
          <OrderPayment>결제: {data.paymentProvider}</OrderPayment>
        </OrderFootWrap>
      </OrderDesc>
      <BtnWrap>
        <BtnAWrap>
          <Btn onClick={() => onClick('accept')}>수락</Btn>
        </BtnAWrap>
        <BtnDWrap>
          <Btn onClick={() => onClick('deny')}>거절</Btn>
        </BtnDWrap>
      </BtnWrap>
    </CardWrap>
  )
}

export default SellerNoti

const CardWrap = styled.div`
  height: 200px;
  width: 400px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: rgb(255, 165, 0, 0.9);
  padding: 10px;
`

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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: green;
  color: white;
  font-family: inherit;
  font-size: 21px;
`
