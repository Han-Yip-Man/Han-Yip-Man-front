import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import * as S from './MyCoupon.style'
import { postCoupon } from '../../../api/coupons'
import { useForm } from 'react-hook-form'
import useCoupon from '../hooks/useCoupon'

const MyCoupon = () => {
  const { data } = useCoupon()
  console.log(data)
  const { register, handleSubmit } = useForm()

  return (
    <S.CouponWrapper>
      <S.Title>
        <h2>쿠폰함</h2>
      </S.Title>
      <form onSubmit={handleSubmit((data) => postCoupon(data))}>
        <S.CouponInputbox>
          <TextField
            id="filled-basic"
            label="쿠폰번호입력"
            variant="filled"
            {...register('couponCode')}
          />
          <Button type="submit" variant="contained">
            쿠폰등록
          </Button>
        </S.CouponInputbox>
      </form>
      <S.Couponlist>
        {data?.map((coupon) => (
          <Card key={coupon.couponId} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                {coupon.discountPrice}
              </Typography>
              <Typography variant="h6">{coupon.couponCode}</Typography>
            </CardContent>
          </Card>
        ))}
      </S.Couponlist>
    </S.CouponWrapper>
  )
}

export default MyCoupon
