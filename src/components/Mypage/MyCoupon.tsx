import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const MyCoupon = () => {
  return (
    <CouponWrapper>
      <div className="coupon_title">
        <h2>쿠폰함</h2>
      </div>
      <div className="coupon_Inputbox">
        <TextField id="filled-basic" label="쿠폰번호입력" variant="filled" />
        <Button variant="contained">쿠폰등록</Button>
      </div>
      <div className="coupon_list">
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
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              5,000원
            </Typography>
            <Typography variant="h6">첫주문 할인 쿠폰</Typography>
          </CardContent>
        </Card>
      </div>
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
  .coupon_title {
    width: 100px;
    margin: 30px 0 30px 0;
    h2 {
      font-size: 30px;
    }
  }
  .coupon_Inputbox {
    display: flex;
    gap: 40px;
    input {
      width: 300px;
    }
  }
  .coupon_list {
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
  }
`
