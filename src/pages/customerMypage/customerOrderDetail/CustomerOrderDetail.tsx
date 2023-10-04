import { Box, Button, CardContent, Chip, Typography } from '@mui/material'
import { DeliveryKakaoMap } from '../../../api/kakao.api'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../../../api/customerOrder'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getAddressToLatLng, getTempCurrentLatLng } from '../../../utils/map.util'
import { currentLocationAtom, endPointLocationAtom } from '../../../atoms/deliveryAtoms'
import { useRecoilState, useRecoilValue } from 'recoil'
// import { MapCoordsState } from '../../atoms/orderManageAtoms'
import { useSocketContext } from '../../common/hooks'
import { UserInfoType } from '../../../types/user'
import { userInfo } from '../../../atoms/userInfoAtoms'
import * as S from './CustomerOrderDetail.style'
import { ReviewCardForm } from '../reviewCardForm/ReviewCardForm'
import useOrder from '../hooks/useOrder'

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
  console.log(orderIdParam)
  const { data } = useOrder(orderIdParam)
  const [delivered, IsDelivered] = useState(false)
  const [currentPlace, setCurrentPlace] = useState({ lat: 0, lng: 0 })

  const { socket } = useSocketContext()
  const user = useRecoilValue(userInfo) as UserInfoType

  useEffect(() => {
    if (data) {
      setCurrentPlace({ lat: data.shopLat, lng: data.shopLng })
    }
  }, [])

  useEffect(() => {
    if (data) {
      if (currentPlace.lat === data.latitude && currentPlace.lng === data.longitude) {
        console.log(currentPlace.lat, data.latitude)
        console.log(currentPlace.lng, data.longitude)
        IsDelivered(true)
      }
    }
  }, [currentPlace.lat, currentPlace.lng])

  /**
   * WS
   */
  useEffect(() => {
    if (data) {
      socket?.emit('room_enter', `user${user.userIdx}`, (res: any) => {
        console.log('entered', res)

        socket?.on('NoticeDroneLocation', (message) => {
          console.log('msg', message)
          setTimeout(() => {
            setCurrentPlace(message)
          }, 1000)
        })
      })
    }

    return () => {}
  }, [])

  // useEffect(() => {
  // getAddressToLatLng(data?.address, setEndPoint)
  // setEndPoint({ lat: data?.lat, lng: data?.lng })
  // console.log(endPoint)
  /**
   * 임시
   */
  //   const start = { lat: 37.492569, lng: 127.026444 }
  //   const end = { lat: 37.539397, lng: 126.849724 }
  //   const res = getTempCurrentLatLng(start, end)
  //   console.log(res)
  //   const timer = setInterval(() => {
  //     if (res.length === 1) clearInterval(timer)
  //     setCurrentPlace(() => res[0])
  //     res.shift()
  //   }, 400)
  //   return () => clearInterval(timer)
  //   // }, [data])
  // }, [])

  // useEffect(() => {
  //   if (data) {
  //     console.log('eeeeeddddddd', data)
  //     const start = { lat: data.latitude, lng: data.longitude }
  //     const end = { lat: data.shopLat, lng: data.shopLng }
  //     const res = getTempCurrentLatLng(start, end)
  //     console.log(res)
  //     const timer = setInterval(() => {
  //       if (res.length === 1) clearInterval(timer)
  //       setCurrentPlace(() => res[0])
  //       res.shift()
  //     }, 1000)
  //     return () => clearInterval(timer)
  //   }

  //   return () => {}
  // }, [])

  const clickHandler = () => {
    setOrderIdParam(0)
    setmenupage(2)
  }
  return (
    <S.OrderDetailWrap>
      <S.OrderInfoStack>
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
        <S.OrderInfoPaper>
          <Typography variant="h6">주문번호: {data?.orderUid}</Typography>
          <Typography variant="h6">주문시간: {data?.createdAt}</Typography>
          <Typography variant="h6">주소지: {data?.address}</Typography>
          <Typography variant="h6">구매자 전화번호: {data?.phoneNum}</Typography>
          <Typography variant="h6">상호명: {data?.shopName}</Typography>
          <Typography variant="h6">가게 전화번호: {data?.shopTelphoneNum}</Typography>
        </S.OrderInfoPaper>
      </S.OrderInfoStack>

      <S.DeliveryMapStack>
        <Typography variant="h5" component={Box}>
          실시간 배달
          <Chip
            className="order_state"
            label={delivered ? '배달 완료' : '배달 중..'}
            color={delivered ? 'primary' : 'warning'}
          />
          {data ? (
            <DeliveryKakaoMap
              mapId="delivery"
              width="1050px"
              height="350px"
              startPointLat={data.shopLat}
              startPointLng={data.shopLng}
              curPointLat={currentPlace.lat}
              curPointLng={currentPlace.lng}
              endPointLat={data.latitude}
              endPointLng={data.longitude}
            />
          ) : null}
        </Typography>
      </S.DeliveryMapStack>

      <S.OrderListInfoStack>
        <Typography variant="h5" component={Box}>
          주문 내역
          {data?.orderMenus.map((menu: any, index: any) => (
            <S.OrderListCard key={index}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data?.shopName}
                </Typography>
                {menu.options.map((option: any, index: any) => (
                  <Typography key={index} variant="body1" color="text.secondary">
                    {menu.name} <span>옵션:{option.optionName}</span>
                  </Typography>
                ))}
                <Typography>주문가격 : {menu.price}원</Typography>
              </CardContent>
            </S.OrderListCard>
          ))}
        </Typography>
      </S.OrderListInfoStack>

      <S.PaymentsStack>
        <Typography variant="h5" component={Box}>
          결제 정보
          <S.PaymentInfoPaper>
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
          </S.PaymentInfoPaper>
        </Typography>
      </S.PaymentsStack>

      <S.ReviwFormStack>
        <Typography variant="h5" component={Box}>
          리뷰 작성
          <ReviewCardForm shopId={data?.shopId} />
        </Typography>
      </S.ReviwFormStack>
    </S.OrderDetailWrap>
  )
}
