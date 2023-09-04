import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const MyCoupon = () => {
  return (
    <CouponWrapper>
      <Title>
        <h2>쿠폰함</h2>
      </Title>
      <CouponInputbox>
        <TextField id="filled-basic" label="쿠폰번호입력" variant="filled" />
        <Button variant="contained">쿠폰등록</Button>
      </CouponInputbox>
      <Couponlist>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              5,000원
            </Typography>
            <Typography variant="h6">첫주문 할인 쿠폰</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              5,000원
            </Typography>
            <Typography variant="h6">첫주문 할인 쿠폰</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              5,000원
            </Typography>
            <Typography variant="h6">첫주문 할인 쿠폰</Typography>
          </CardContent>
        </Card>
      </Couponlist>
    </CouponWrapper>
  )
}

export default MyCoupon

const CouponWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  width: 100px;
  margin: 30px 0 30px 0;
  h2 {
    font-size: 30px;
  }
`

const CouponInputbox = styled.div`
  display: flex;
  gap: 40px;
  input {
    width: 300px;
  }
`
const Couponlist = styled.div`
  width: 90%;
  padding: 30px;
  overflow-y: auto;
  margin-top: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
  .MuiCard-root {
    width: 100%;
    margin-bottom: 30px;
  }
`
