import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import * as S from './OrderDashboard.style'

const OrderDashboard = () => {
  return (
    <S.DashboardWrapper>
      <S.Title>
        <h2>주문내역</h2>
      </S.Title>
      <S.ItemList>
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
      </S.ItemList>
    </S.DashboardWrapper>
  )
}

export default OrderDashboard