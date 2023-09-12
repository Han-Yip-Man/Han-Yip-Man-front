import { Divider, Skeleton } from '@mui/material'
import * as S from './StoreCard.style'

function StoreCard() {
  const loading = false

  return (
    <S.CustomCard>
      <S.CustomCardAction>
        <S.MediaWrap>
          {loading ? (
            <Skeleton animation="wave" variant="rectangular" sx={{ height: '100%' }} />
          ) : (
            <S.Media image="/img/jjajang.jpg" />
          )}
        </S.MediaWrap>
        <S.Content>
          <S.TitleWrap>
            {loading ? (
              <Skeleton animation="wave" variant="text" />
            ) : (
              <S.Title gutterBottom variant="h5">
                홍보각
              </S.Title>
            )}
            {loading ? (
              <Skeleton animation="wave" variant="text" sx={{ ml: '10px' }} />
            ) : (
              <S.ChipWrap>
                <S.CustomChip color="warning" label={`⭐ ${'5.0'}`} />
              </S.ChipWrap>
            )}
          </S.TitleWrap>
          <S.DescWrap>
            {loading ? (
              <>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </>
            ) : (
              <S.StoreDesc variant="body2" color="GrayText">
                짜장면 맛집입니다.
              </S.StoreDesc>
            )}
            <S.StoreInfoWrap>
              {loading ? (
                <>
                  <Skeleton width={50} animation="wave" />
                  <Skeleton width={50} animation="wave" />
                </>
              ) : (
                <>
                  <S.ReviewCount color="salmon">리뷰 50</S.ReviewCount>
                  <S.Estimated>예상 배달시간 50분</S.Estimated>
                </>
              )}
            </S.StoreInfoWrap>
          </S.DescWrap>
          <Divider />
          <S.DeliveryInfo>
            {loading ? (
              <>
                <Skeleton width={50} animation="wave" />
                <Skeleton width={50} animation="wave" />
              </>
            ) : (
              <>
                <S.MinOrder>최소주문금액 10,000원</S.MinOrder>
                <S.DeliveryFee color="slategrey">배달료 3,000원</S.DeliveryFee>
              </>
            )}
          </S.DeliveryInfo>
        </S.Content>
      </S.CustomCardAction>
    </S.CustomCard>
  )
}

export default StoreCard
