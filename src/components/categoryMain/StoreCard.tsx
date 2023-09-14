import { Divider, Skeleton } from '@mui/material'
import * as S from './StoreCard.style'

interface Props extends StoreDetail {
  isLoading: boolean
}

function StoreCard({
  isLoading,
  avgRating,
  minOrderPrice,
  reviewCount,
  shopName,
  shopDescription,
  deliveryTime,
  deliveryPrice,
}: Props) {
  // avgRating: number
  // deliveryPrice: number
  // deliveryTime: number
  // distance: number
  // isLoading: boolean
  // minOrderPrice: number
  // reviewCount: number
  // shopDescription: string
  // shopId: number
  // shopName: string
  // thumbnailUrl: string

  return (
    <S.CustomCard>
      <S.CustomCardAction>
        <S.MediaWrap>
          {isLoading ? (
            <Skeleton animation="wave" variant="rectangular" sx={{ height: '100%' }} />
          ) : (
            <S.Media image="/img/jjajang.jpg" />
          )}
        </S.MediaWrap>
        <S.Content>
          <S.TitleWrap>
            {isLoading ? (
              <Skeleton animation="wave" variant="text" />
            ) : (
              <S.Title gutterBottom variant="h5">
                {shopName}
              </S.Title>
            )}
            {isLoading ? (
              <Skeleton animation="wave" variant="text" sx={{ ml: '10px' }} />
            ) : (
              <S.ChipWrap>
                <span>
                  <S.CustomChip
                    color="warning"
                    label={`⭐ ${!avgRating ? '평점없음' : avgRating.toFixed(1)}`}
                  />
                </span>
              </S.ChipWrap>
            )}
          </S.TitleWrap>
          <S.DescWrap>
            {isLoading ? (
              <>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </>
            ) : (
              <S.StoreDesc variant="body2" color="GrayText">
                {shopDescription}
              </S.StoreDesc>
            )}
            <S.StoreInfoWrap>
              {isLoading ? (
                <>
                  <Skeleton width={50} animation="wave" />
                  <Skeleton width={50} animation="wave" />
                </>
              ) : (
                <>
                  <S.ReviewCount color="salmon">리뷰 {reviewCount}</S.ReviewCount>
                  <S.Estimated>예상 배달시간 {deliveryTime / 1000}분</S.Estimated>
                </>
              )}
            </S.StoreInfoWrap>
          </S.DescWrap>
          <Divider />
          <S.DeliveryInfo>
            {isLoading ? (
              <>
                <Skeleton width={50} animation="wave" />
                <Skeleton width={50} animation="wave" />
              </>
            ) : (
              <>
                <S.MinOrder>최소주문금액 {minOrderPrice.toLocaleString()}원</S.MinOrder>
                <S.DeliveryFee color="slategrey">
                  배달료 {deliveryPrice.toLocaleString()}원
                </S.DeliveryFee>
              </>
            )}
          </S.DeliveryInfo>
        </S.Content>
      </S.CustomCardAction>
    </S.CustomCard>
  )
}

export default StoreCard
