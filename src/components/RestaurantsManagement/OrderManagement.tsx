import styled from '@emotion/styled'
import OrderManagementList from './OrderManagementList'
import { Stack } from '@mui/material'

function OrderManagement() {
  return (
    <Wrap>
      <CustomStack direction={{ xs: 'column', sm: 'row' }}>
        <OrderManagementList title={'주문대기'} />
        <OrderManagementList title="주문접수" />
        <OrderManagementList title="조리시작" />
        <OrderManagementList title="배달시작" />
      </CustomStack>
    </Wrap>
  )
}

export default OrderManagement

const Wrap = styled.div`
  padding: 50px;
`

const CustomStack = styled(Stack)`
  justify-content: space-around;
`
