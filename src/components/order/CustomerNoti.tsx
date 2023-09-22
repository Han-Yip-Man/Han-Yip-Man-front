import styled from '@emotion/styled'

// {
//   address: '',
//   addressDetail: '',
//   menuNames: '',
//   orderId: 0,
//   orderUId: '',
//   orderedTime: '',
//   orderStatus: '',
//   paymentProvider: '',
//   totalAmount: 0,
// },

interface Props {
  t: any
  onClose: (id: string) => void
  data: AlarmData
}

interface StatusProps {
  status: OrderState
}

const CustomerNoti = ({ data }: Props) => {
  const status = {
    CANCELED: '주문 취소',
    TAKEOVER: '주문 접수',
    COOKING: '조리 중',
    DELIVERY: '배달 출발',
    COMPLETE: '배달 완료',
    PAID: '결제 완료',
  }

  return (
    <CardWrap2>
      <Title>주문상태가 변경되었습니다.</Title>
      <OrderInfo>
        <div>
          <OrderId>주문번호: {data.orderId}</OrderId>
          <OrderId>주문UID: {data.orderUId}</OrderId>
          <MenuNames>{data.menuNames}</MenuNames>
          <Amount>{data.totalAmount.toLocaleString()}원</Amount>
        </div>
        <Status status={data.orderStatus}>{status[data.orderStatus]}</Status>
      </OrderInfo>
    </CardWrap2>
  )
}

export default CustomerNoti

const CardWrap2 = styled.div`
  height: 200px;
  width: 400px;
  display: grid;
  grid-template-rows: 1fr 2fr;
  background-color: rgb(255, 165, 0, 0.9);
  padding: 10px;
`

const Title = styled.h1`
  font-size: 30px;
  display: grid;
  place-content: center;
`

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const OrderId = styled.div`
  margin-bottom: 10px;
`

const MenuNames = styled.div`
  color: white;
  font-size: 22px;
  margin-bottom: 10px;
`
const Amount = styled.div`
  text-align: center;
  color: purple;
`

const Status = styled.div<StatusProps>`
  place-self: center;
  font-size: 30px;

  color: ${({ status }) => {
    switch (status) {
      case 'CANCELED':
        return 'red'
      case 'TAKEOVER':
        return 'green'
      case 'COOKING':
        return 'purple'
      case 'DELIVERY':
        return 'blue'
      case 'COMPLETE':
        return 'white'
    }
  }};
`
