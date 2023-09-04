import styled from '@emotion/styled'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

const OrderDashboard = () => {
  return (
    <DashboardWrapper>
      <Title>
        <h2>주문내역</h2>
      </Title>
      <ItemList>
        <Card>
          <CardMedia sx={{ width: 100, height: 100 }} image="/img/ordertest.jpg" title="green iguana" />
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
          <CardMedia sx={{ width: 100, height: 100 }} image="/img/ordertest.jpg" title="green iguana" />
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
      </ItemList>
    </DashboardWrapper>
  )
}

export default OrderDashboard

const DashboardWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  margin: 50px;
  h2 {
    font-size: 30px;
  }
`

const ItemList = styled.div`
  margin-top: 30px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .MuiCard-root {
    display: flex;
    align-items: center;
    width: 800px;
    padding: 10px 25px;
    margin-bottom: 30px;
    .MuiCardContent-root {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      span {
        color: red;
      }
    }
    .MuiChip-root {
      font-size: 20px;
      padding: 5px;
    }
  }
`
