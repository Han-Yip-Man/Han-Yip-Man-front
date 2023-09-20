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
import { getAddressToLatLng, getTempCurrentLatLng } from '../../utils/map.util'
import { useSSEContext } from '../../hooks'
import { endPointLocationAtom } from '../../atoms/deliveryAtoms'
import { useRecoilState } from 'recoil'

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
  const sse = useSSEContext()
  const [endPoint, setEndPoint] = useRecoilState(endPointLocationAtom)

  type Place = {
    lat: number
    lng: number
  }
  const [currentPlace, setCurrentPlace] = useState<Place>({} as Place)
  // console.log(currentPlace)

  useEffect(() => {
    getAddressToLatLng(data?.address, setEndPoint)
    console.log(endPoint)

    /**
     * sse로 전환
     */
    // sse?.addEventListener('DronLocation', (e) => {
    //   if (e.data) {
    //     const data = JSON.parse(e.data)
    //     console.log(data)
    //     setCurrentPlace({ lat: data.latitude, lng: data.longitude })
    //   }
    // })

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
    // }, 1000)

    // return () => clearInterval(timer)
  }, [])

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
          <img width={'39px'} src="/svg/drone.svg" alt="drone" />
          {data?.latitude !== undefined && data.longitude !== undefined ? (
            <DeliveryKakaoMap
              mapId="delivery"
              width="1050px"
              height="350px"
              latitude={data?.latitude}
              longitude={data?.longitude}
              curLatitude={currentPlace.lat}
              curLongitude={currentPlace.lng}
              endingPointLatitude={endPoint.lat}
              endingPointLongitude={endPoint.lng}
            />
          ) : null}
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
