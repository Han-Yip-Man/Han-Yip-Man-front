import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { Box, CardActionArea, Stack, styled } from '@mui/material'
import * as S from './OrderDashboard.style'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getOrders, getOrdersInf } from '../../../api/customerOrder'
import { Dispatch, SetStateAction } from 'react'
import { useIntersection } from '../../../hooks'

type OrderDashboardProps = {
  setmenupage: Dispatch<SetStateAction<number>>
  setOrderIdParam: Dispatch<SetStateAction<number>>
}

const OrderDashboard = ({ setmenupage, setOrderIdParam }: OrderDashboardProps) => {
  const { data } = useQuery(['orders'], () => getOrders())

  // const {
  //   data: ordersInfData,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  // } = useInfiniteQuery({
  //   queryKey: ['orders'],
  //   queryFn: ({ pageParam = 0 }) => getOrdersInf(pageParam),
  //   getNextPageParam: (lastPage) => lastPage.cursor,
  // })

  // const ref = useIntersection(fetchNextPage, hasNextPage)

  const getOrderDetail = (orderId: number) => {
    setOrderIdParam(orderId)
    setmenupage(3)
  }
  return (
    <S.DashboardWrapper>
      <S.Title>
        <h2>주문내역</h2>
      </S.Title>
      <S.ItemList>
        {/* {isFetching && !ordersInfData ? (
          <div>Loading...</div>
        ) : (
          <div>
            {ordersInfData?.pages.map((page) => {
              page?.content.map((order: any) => (
                <Card key={order.orderUid}>
                  <CardActionArea onClick={() => getOrderDetail(order.orderId)}>
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
                        {order.menus.map((menu: any, i: any) => (
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
              ))
            })}
          </div>
        )}
        <OrdersObserver ref={ref}></OrdersObserver> */}

        {data?.content.map((order: any) => (
          <Card key={order.orderUid}>
            <CardActionArea onClick={() => getOrderDetail(order.orderId)}>
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
                  {order.menus.map((menu: any, i: any) => (
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

const OrdersObserver = styled(Box)`
  height: 400px;
  width: 100px;
`
