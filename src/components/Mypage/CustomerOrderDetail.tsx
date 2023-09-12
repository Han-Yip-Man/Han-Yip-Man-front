import { Box, Button, Card, CardContent, Chip, Stack, Typography, styled } from '@mui/material'
import { DeliveryKakaoMap } from '../../api/kakao.api'
import { ReviewCardForm } from './ReviewCardForm'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'

type CustomerOrderDetailProps = {
  setmenupage: React.Dispatch<React.SetStateAction<number>>
}

export const CustomerOrderDetail = ({ setmenupage }: CustomerOrderDetailProps) => {
  const clickHandler = () => {
    setmenupage(2)
  }
  return (
    <OrderDetailWrap>
      <OrderDetailTitle>
        <Button
          onClick={clickHandler}
          variant="outlined"
          startIcon={<KeyboardArrowLeftRoundedIcon />}
        >
          돌아가기
        </Button>
        <Typography variant="h5" component={Box}>
          주문
        </Typography>
        <Chip className="order_state" label="배달완료" color="primary" />
      </OrderDetailTitle>
      <Stack>
        <Typography variant="h5" component={Box}>
          가게 정보
        </Typography>
        <Typography variant="h6" component={Box}>
          상호명 주문정보 주문일시 가게번호 가게상세
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="h5" component={Box}>
          주문 내역
        </Typography>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              3대 전통 할매손맛피자
            </Typography>
            <Typography variant="body1" color="text.secondary">
              청국장 피자 <span>옵션:산나물 토핑추가</span>
            </Typography>
            <Typography>주문가격 : 423,000원</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              3대 전통 할매손맛피자
            </Typography>
            <Typography variant="body1" color="text.secondary">
              청국장 피자 <span>옵션:산나물 토핑추가</span>
            </Typography>
            <Typography>주문가격 : 423,000원</Typography>
          </CardContent>
        </Card>
      </Stack>
      <Stack>
        <Typography variant="h5" component={Box}>
          결제 정보
        </Typography>
        <Typography variant="h6" component={Box}>
          결제금액 결제방법 배달주소 전화번호 메시지 등
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="h5" component={Box}>
          실시간 배달
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
            latitude={37.490569}
            longitude={127.032444}
          />
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="h5" component={Box}>
          리뷰 작성
        </Typography>
        <ReviewCardForm />
      </Stack>
    </OrderDetailWrap>
  )
}

const OrderDetailWrap = styled(Stack)`
  margin: 16px;
`

const OrderDetailTitle = styled(Stack)`
  margin: 16px;
  flex-direction: row;
  justify-content: space-between;
`
