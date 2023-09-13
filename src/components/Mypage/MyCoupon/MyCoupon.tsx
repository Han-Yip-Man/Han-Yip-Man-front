import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as S from './MyCoupon.style'

const MyCoupon = () => {
  return (
    <S.CouponWrapper>
      <S.Title>
        <h2>쿠폰함</h2>
      </S.Title>
      <S.CouponInputbox>
        <TextField id="filled-basic" label="쿠폰번호입력" variant="filled" />
        <Button variant="contained">쿠폰등록</Button>
      </S.CouponInputbox>
      <S.Couponlist>
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
      </S.Couponlist>
    </S.CouponWrapper>
  )
}

export default MyCoupon
