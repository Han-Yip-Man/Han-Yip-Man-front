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
import { getOrder } from '../../api/orderDetail'

type CustomerOrderDetailProps = {
  setmenupage: React.Dispatch<React.SetStateAction<number>>
}

export const CustomerOrderDetail = ({ setmenupage }: CustomerOrderDetailProps) => {
  // const { data } = useQuery(['order'], () => getOrder(orderId)) // orderId는 주문내역에서 들어올 때 보내기
  const { data } = useQuery(['order'], () => getOrder())
  console.log(data)
  const clickHandler = () => {
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
          {/**
           * TODO:
           * 두 지점
           * 선분
           * 이동하는 점
           * 남은 거리 시간 표시
           * 등등
           */}
          <DeliveryKakaoMap
            mapId="delivery"
            width="1050px"
            height="350px"
            latitude={data?.latitude}
            longitude={data?.longitude}
          />
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="h5" component={Box}>
          주문 내역
          {data?.orderMenus.map((menu) => (
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data?.shopName}
                </Typography>
                {menu.options.map((option) => (
                  <Typography variant="body1" color="text.secondary">
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
