import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Icon,
  Stack,
  SvgIcon,
  Typography,
  styled,
} from '@mui/material'
import { DeliveryKakaoMap } from '../../api/kakao.api'
import { ReviewCardForm } from './ReviewCardForm'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../../api/customerOrder'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getTempCurrentLatLng } from '../../utils/map.util'

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
  const { data } = useQuery(['order', orderIdParam], () => getOrder(orderIdParam))
  // console.log(data)

  /**
   * getOrder 에서 shop lat, lng 가져와서 지도에 starting 값으로
   * sse 로 cur lat, cur lng 받아서 지도에 lat, lng 값으로
   *
   */
  type Place = {
    lat: number
    lng: number
  }
  const [currentPlace, setCurrentPlace] = useState<Place>({} as Place)
  console.log(currentPlace)

  useEffect(() => {
    const start = { lat: 37.492569, lng: 127.026444 }
    const end = { lat: 37.488569, lng: 127.037444 }
    const res = getTempCurrentLatLng(start, end)
    console.log(res)

    const timer = setInterval(() => {
      if (res.length === 1) clearInterval(timer)
      setCurrentPlace(() => res[0])
      res.shift()
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // useEffect(() => {}, [currentPlace])

  const clickHandler = () => {
    setOrderIdParam(0)
    setmenupage(2)
  }
  return (
    <OrderDetailWrap>
      <Stack>
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
        <Typography variant="h6">주문번호: {data?.orderUid}</Typography>
        <Typography variant="h6">주문시간: {data?.createdAt}</Typography>
        <Typography variant="h6">주소지: {data?.address}</Typography>
        <Typography variant="h6">구매자 전화번호: {data?.phoneNum}</Typography>
        <Typography variant="h6">상호명: {data?.shopName}</Typography>
        <Typography variant="h6">가게 전화번호: {data?.shopTelphoneNum}</Typography>
      </Stack>
      <Stack>
        <Typography variant="h5" component={Box}>
          실시간 배달
          <Chip className="order_state" label="배달완료" color="primary" />
          <img width={'39px'} src="/public/svg/drone.svg" alt="drone" />
          <DeliveryKakaoMap
            mapId="delivery"
            width="1050px"
            height="350px"
            curLatitude={currentPlace.lat}
            curLongitude={currentPlace.lng}
            latitude={data?.latitude}
            longitude={data?.longitude}
          />
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="h5" component={Box}>
          주문 내역
          {data?.orderMenus.map((menu, i) => (
            <Card key={menu.name}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data?.shopName}
                </Typography>
                {menu.options.map((option, i) => (
                  <Typography key={option.optionName} variant="body1" color="text.secondary">
                    {menu.name} <span>옵션:{option.optionName}</span>
                  </Typography>
                ))}
                <Typography>주문가격 : {menu.price}원</Typography>
              </CardContent>
            </Card>
          ))}
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="h5" component={Box}>
          결제 정보
          <Typography variant="h6">주문상태: {data?.orderStatus}</Typography>
          <Typography variant="h6">결제방법: {data?.payMethod}</Typography>
          {data?.canceledAt ? (
            <Typography variant="h6">취소시간: {data?.canceledAt}</Typography>
          ) : null}
          <Typography variant="h6" component={Box}>
            결제비용컴포넌트
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
        </Typography>
      </Stack>

      <Stack>
        <Typography variant="h5" component={Box}>
          리뷰 작성
          <ReviewCardForm shopId={data?.shopId} />
        </Typography>
      </Stack>
    </OrderDetailWrap>
  )
}

const OrderDetailWrap = styled(Stack)`
  margin: 16px;
`

// const OrderDetailTitle = styled(Stack)`
//   margin: 16px;
//   flex-direction: row;
// `
