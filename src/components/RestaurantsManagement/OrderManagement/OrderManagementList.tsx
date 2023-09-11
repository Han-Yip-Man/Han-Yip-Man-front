import styled from '@emotion/styled'
import { List } from '@mui/material'
import OrderListItem from './OrderListItem'

type Props = {
  title: string
}

function OrderManagementList({ title }: Props) {
  return (
    <ListWrap>
      <Title>{title}</Title>
      <CustomList>
        <OrderListItem />
        <OrderListItem />
        <OrderListItem />
        <OrderListItem />
        <OrderListItem />
        <OrderListItem />
        <OrderListItem />
      </CustomList>
    </ListWrap>
  )
}

export default OrderManagementList

const ListWrap = styled.div`
  min-width: 270px;
  padding: 30px;
  background-color: #808080;
`

const CustomList = styled(List)`
  overflow: hidden;
`

const Title = styled.div`
  display: grid;
  place-items: center;
`
