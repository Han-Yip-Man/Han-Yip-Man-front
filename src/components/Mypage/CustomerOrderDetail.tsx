import { Box, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DeliveryKakaoMap } from '../../api/kakao.api'
import { ReviewCardForm } from './ReviewCardForm'

type CustomerOrderDetailProps = {
  setmenupage: React.Dispatch<React.SetStateAction<number>>
}

export const CustomerOrderDetail = ({ setmenupage }: CustomerOrderDetailProps) => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(-1)
    setmenupage(2)
  }
  return (
    <Stack spacing={2} bgcolor={'primary.main'}>
      <Box width={100} height={100} bgcolor={'secondary.main'}>
        <button onClick={clickHandler}>돌아가기</button>
      </Box>
      order info================================
      <Stack width={800} bgcolor={'secondary.main'} flexDirection={'row'}>
        <Typography variant="h5" component={Box}>
          주문
        </Typography>
        <Typography variant="h5" component={Box}>
          주문완료
        </Typography>
      </Stack>
      <Typography variant="h5" component={Box}>
        상품================================
      </Typography>
      <Card>
        <CardMedia
          sx={{ width: 100, height: 100 }}
          image="/img/ordertest.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            3대 전통 할매손맛피자
          </Typography>
          <Typography variant="body1" color="text.secondary">
            청국장 피자 <span>옵션:산나물 토핑추가</span>
          </Typography>
          <Typography>주문가격 : 423,000원</Typography>
        </CardContent>
        <Chip className="order_state" label="배달완료" color="primary" />
      </Card>
      <Box>결제 info================================</Box>
      <Typography variant="h5" component={Box}>
        언제 얼마 결제함
      </Typography>
      <Box>delivery info================================</Box>
      <Typography variant="h5" component={Box}>
        지도 배달 완료
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
          width="750px"
          height="350px"
          latitude={37.490569}
          longitude={127.032444}
        />
      </Typography>
      <Box>review rating comment picture================================</Box>
      <Typography variant="h5" component={Box}>
        리뷰 작성
        <ReviewCardForm />
      </Typography>
    </Stack>
  )
}
