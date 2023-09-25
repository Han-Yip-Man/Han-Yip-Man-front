import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import kakaoApi, { DeliveryKakaoMap } from '../../api/kakao.api'
import { ReviewCardForm } from './ReviewCardForm'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../../api/customerOrder'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getAddressToLatLng, getTempCurrentLatLng } from '../../utils/map.util'
import { currentLocationAtom, endPointLocationAtom } from '../../atoms/deliveryAtoms'
import { useRecoilState, useRecoilValue } from 'recoil'
// import { MapCoordsState } from '../../atoms/orderManageAtoms'
import { useSocketContext } from '../../hooks'
import { UserInfoType } from '../../types/user'
import { userInfo } from '../../atoms/userInfoAtoms'

type CustomerOrderDetailProps = {
  setmenupage: Dispatch<SetStateAction<number>>

  orderIdParam: number
  setOrderIdParam: Dispatch<SetStateAction<number>>
}

export const CustomerOrderDetail = ({
  setmenupage,
  orderIdParam,
  setOrderIdParam,
}: CustomerOrderDetailProps) => {
  const { data, isLoading } = useQuery(['order', orderIdParam], () => getOrder(orderIdParam))
  const [endPoint, setEndPoint] = useRecoilState(endPointLocationAtom)
  const [delivered, IsDelivered] = useState(false)
  // SSE에서 WS으로 변경
  // const mapCoods = useRecoilValue(MapCoordsState)
  const { socket } = useSocketContext()

  const user = useRecoilValue(userInfo) as UserInfoType

  const [currentPlace, setCurrentPlace] = useRecoilState(currentLocationAtom)
  // console.log(data, currentPlace, endPoint)

  useEffect(() => {
    socket?.emit('room_enter', `user${user.userIdx}`, () => {
      socket.on('NoticeDroneLocation', (res) => {
        console.log(res)
        setCurrentPlace(() => ({ lat: res.latitude, lng: res.longitude }))
      })
    })

    return () => {}
  }, [socket, currentPlace])

  useEffect(() => {
    // getAddressToLatLng(data?.address, setEndPoint)
    // console.log('sdfsdf', endPoint)
    /**
     * 임시
     */
    // const start = { lat: 37.492569, lng: 127.026444 }
    // const end = { lat: 37.539397, lng: 126.849724 }
    // const res = getTempCurrentLatLng(start, end)
    // console.log(res)
    // const timer = setInterval(() => {
    //   if (res.length === 1) clearInterval(timer)
    //   setCurrentPlace(() => res[0])
    //   res.shift()
    // }, 400)
    // return () => clearInterval(timer)
  }, [data])
  // }, [currentPlace])

  const clickHandler = () => {
    setOrderIdParam(0)
    setmenupage(2)
  }

  console.log('datacheck>>>>>', data)
  console.log('datacheck>>>>>', endPoint)
  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <OrderDetailWrap>
          <OrderInfoStack>
            <Button
              onClick={clickHandler}
              variant="outlined"
              startIcon={<KeyboardArrowLeftRoundedIcon />}
            >
              돌아가기
            </Button>
            <Typography variant="h5" component={Box}>
              주문 정보
            </Typography>
            <OrderInfoPaper>
              <Typography variant="h6">주문번호: {data?.orderUid}</Typography>
              <Typography variant="h6">주문시간: {data?.createdAt}</Typography>
              <Typography variant="h6">주소지: {data?.address}</Typography>
              <Typography variant="h6">구매자 전화번호: {data?.phoneNum}</Typography>
              <Typography variant="h6">상호명: {data?.shopName}</Typography>
              <Typography variant="h6">가게 전화번호: {data?.shopTelphoneNum}</Typography>
            </OrderInfoPaper>
          </OrderInfoStack>

          <DeliveryMapStack>
            <Typography variant="h5" component={Box}>
              실시간 배달
              <Chip
                className="order_state"
                label={delivered ? '배달 완료' : '배달 중..'}
                color={delivered ? 'primary' : 'warning'}
              />
              {/* {data?.latitude !== undefined && data.longitude !== undefined ? ( */}
              <DeliveryKakaoMap
                mapId="delivery"
                width="1050px"
                height="350px"
                // latitude={37.492743}
                // longitude={127.0138679}
                latitude={data?.lat}
                longitude={data?.lng}
                curLatitude={currentPlace.lat}
                curLongitude={currentPlace.lng}
                // curLatitude={37.492743}
                // curLongitude={127.0138679}
                addressData={data.address}
                endPointLatitude={data.endLat}
                endPointLongitude={data.endLng}
              />
              {/* ) : null} */}
            </Typography>
          </DeliveryMapStack>

          <OrderListInfoStack>
            <Typography variant="h5" component={Box}>
              주문 내역
              {data?.orderMenus.map((menu: any) => (
                <OrderListCard key={menu.name}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data?.shopName}
                    </Typography>
                    {menu.options.map((option: any) => (
                      <Typography key={option.optionName} variant="body1" color="text.secondary">
                        {menu.name} <span>옵션:{option.optionName}</span>
                      </Typography>
                    ))}
                    <Typography>주문가격 : {menu.price}원</Typography>
                  </CardContent>
                </OrderListCard>
              ))}
            </Typography>
          </OrderListInfoStack>

          <PaymentsStack>
            <Typography variant="h5" component={Box}>
              결제 정보
              <PaymentInfoPaper>
                <Typography variant="h6">주문상태: {data?.orderStatus}</Typography>
                <Typography variant="h6">결제방법: {data?.payMethod}</Typography>
                {data?.canceledAt ? (
                  <Typography variant="h6">취소시간: {data?.canceledAt}</Typography>
                ) : null}
                <Typography variant="h6" component={Box}>
                  {/* 결제비용컴포넌트 */}
                  <Typography variant="h6">총 금액: {data?.totalPrice}</Typography>
                  <Typography variant="h6">배달비: {data?.defaultDeliveryPrice}</Typography>
                  <Typography variant="h6">쿠폰할인: {data?.buyerCouponDiscount}</Typography>
                  <hr />
                  <Typography variant="h6">
                    총 결제금액:{' '}
                    {data
                      ? data?.totalPrice + data?.defaultDeliveryPrice - data?.buyerCouponDiscount
                      : null}
                  </Typography>
                </Typography>
              </PaymentInfoPaper>
            </Typography>
          </PaymentsStack>

          <ReviwFormStack>
            <Typography variant="h5" component={Box}>
              리뷰 작성
              <ReviewCardForm shopId={data?.shopId} />
            </Typography>
          </ReviwFormStack>
        </OrderDetailWrap>
      )}
    </>
  )
}

const OrderDetailWrap = styled(Stack)`
  margin: 16px;
`

const OrderInfoStack = styled(Stack)`
  margin: 16px 0;
  > div.MuiTypography-root {
    margin-top: 30px;
  }
`

const OrderInfoPaper = styled(Paper)`
  padding: 16px;
`

const DeliveryMapStack = styled(Stack)`
  margin: 16px 0;
  > div > div {
    margin-left: 10px;
  }
`

// const StyledChip = styled(Chip)((props)=>({
//   backgroundColor: #ffcd05;
// }))

const PaymentsStack = styled(Stack)`
  margin: 16px 0;
`

const PaymentInfoPaper = styled(Paper)`
  padding: 16px;
`

const OrderListInfoStack = styled(Stack)`
  margin: 16px 0;
`

const OrderListCard = styled(Card)`
  margin-top: 20px;
`

const ReviwFormStack = styled(Stack)`
  margin: 16px 0;
`
