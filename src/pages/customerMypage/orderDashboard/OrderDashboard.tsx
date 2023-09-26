import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { Box, CardActionArea, Stack, styled } from '@mui/material'
import * as S from './OrderDashboard.style'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getOrders, getOrdersInf } from '../../../api/customerOrder'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useIntersection } from '../../../hooks'
import { Orders } from '../types'

type OrderDashboardProps = {
  setmenupage: Dispatch<SetStateAction<number>>
  setOrderIdParam: Dispatch<SetStateAction<number>>
}

const OrderDashboard = ({ setmenupage, setOrderIdParam }: OrderDashboardProps) => {
  // const qc = useQueryClient()
  // const { data } = useQuery<Orders>(['orders'], () => getOrders())
  // console.log(data)

  // const { socket } = useSocketContext()

  // const user = useRecoilValue(userInfo) as UserInfoType
  // console.log(user)

  // socket?.emit('room_enter', `user${user.userIdx}`, (res: any) => {
  // console.log('entered', res)
  // socket?.on('NoticeOrderBuyer', (message) => {
  //   console.log('NoticeOrderBuyer', message)
  //   qc.invalidateQueries(['orders'])
  // })
  // })

  const {
    data: ordersInfData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<Orders>({
    // queryKey: ['ordersInf'],
    queryKey: ['orders'],
    queryFn: ({ pageParam = 999 }) => getOrdersInf(pageParam),
    getNextPageParam: (lastPage) => lastPage.cursor,
  })

  const ref = useIntersection(fetchNextPage, hasNextPage)

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
        {isFetching && !ordersInfData ? (
          <div>Loading...</div>
        ) : (
          <div>
            {ordersInfData?.pages.map(
              (page) =>
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
                )),
            )}
          </div>
        )}
        <S.OrdersObserver ref={ref}></S.OrdersObserver>

        {/* {data?.content.map((order: any) => (
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
        ))} */}
      </S.ItemList>
    </S.DashboardWrapper>
  )
}

export default OrderDashboard
