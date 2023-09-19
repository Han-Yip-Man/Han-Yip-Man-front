import { memo } from 'react'
import { Divider } from '@mui/material'
import * as S from './StoreCard.style'

interface Props extends StoreDetail {}

function areEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.avgRating === nextProps.avgRating &&
    prevProps.minOrderPrice === nextProps.minOrderPrice &&
    prevProps.reviewCount === nextProps.reviewCount &&
    prevProps.shopName === nextProps.shopName &&
    prevProps.shopDescription === nextProps.shopDescription &&
    prevProps.deliveryTime === nextProps.deliveryTime &&
    prevProps.deliveryPrice === nextProps.deliveryPrice
  )
}

const StoreCard = memo(
  ({
    avgRating,
    minOrderPrice,
    reviewCount,
    shopName,
    shopDescription,
    deliveryTime,
    deliveryPrice,
  }: Props) => {
    return (
      <S.CustomCard>
        <S.CustomCardAction>
          <S.MediaWrap>
            <S.Media image="/img/jjajang.jpg" />
          </S.MediaWrap>
          <S.Content>
            <S.TitleWrap>
              <S.Title gutterBottom variant="h5">
                {shopName}
              </S.Title>
              <S.ChipWrap>
                <span>
                  <S.CustomChip
                    color="warning"
                    label={`⭐ ${!avgRating ? '평점없음' : avgRating.toFixed(1)}`}
                  />
                </span>
              </S.ChipWrap>
            </S.TitleWrap>
            <S.DescWrap>
              <S.StoreDesc variant="body2" color="GrayText">
                {shopDescription}
              </S.StoreDesc>

              <S.StoreInfoWrap>
                <S.ReviewCount color="salmon">리뷰 {reviewCount}</S.ReviewCount>
                <S.Estimated>예상 배달시간 {deliveryTime / 1000}분</S.Estimated>
              </S.StoreInfoWrap>
            </S.DescWrap>
            <Divider />
            <S.DeliveryInfo>
              <S.MinOrder>최소주문금액 {minOrderPrice.toLocaleString()}원</S.MinOrder>
              <S.DeliveryFee color="slategrey">
                배달료 {deliveryPrice.toLocaleString()}원
              </S.DeliveryFee>
            </S.DeliveryInfo>
          </S.Content>
        </S.CustomCardAction>
      </S.CustomCard>
    )
  },
  areEqual,
)

export default StoreCard
