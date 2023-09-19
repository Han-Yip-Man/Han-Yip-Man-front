import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { CardActionArea, Stack } from '@mui/material'
import * as S from './OrderDashboard.style'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../../../api/customerOrder'
import Order from '../../../pages/order/Order'
import { Dispatch, SetStateAction } from 'react'

type OrderDashboardProps = {
  setmenupage: Dispatch<SetStateAction<number>>
  setOrderIdParam: Dispatch<SetStateAction<number>>
}

const OrderDashboard = ({ setmenupage, setOrderIdParam }: OrderDashboardProps) => {
  const { data } = useQuery(['orders'], () => getOrders())

  const getOrderDetail = (orderUid: number) => {
    setOrderIdParam(orderUid)
    setmenupage(3)
  }
  return (
    <S.DashboardWrapper>
      <S.Title>
        <h2>주문내역</h2>
      </S.Title>
      <S.ItemList>
        {data?.content.map((order) => (
          <Card key={order.orderUid}>
            <CardActionArea onClick={() => getOrderDetail(order.orderUid)}>
              <Stack flexDirection={'row'} alignItems={'center'}>
                <CardMedia
                  sx={{ width: 100, height: 100 }}
                  image={order.bannerImg}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {order.shopName}
                  </Typography>
                  {order.menus.map((menu, i) => (
                    <Typography key={i} variant="body1" color="text.secondary">
                      {menu} <span>옵션:{order.options[i]}</span>
                    </Typography>
                  ))}
                  <Typography>주문가격 : {order.totalPrice}원</Typography>
                </CardContent>
                <Chip className="order_state" label={order.orderStatus} color="primary" />
              </Stack>
            </CardActionArea>
          </Card>
        ))}
      </S.ItemList>
    </S.DashboardWrapper>
  )
}

export default OrderDashboard
