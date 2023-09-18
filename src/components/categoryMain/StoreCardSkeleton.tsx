import { Divider, Skeleton } from '@mui/material'
import * as S from './StoreCard.style'

function StoreCardSkeleton() {
  return (
    <S.CustomCard>
      <S.CustomCardAction>
        <S.MediaWrap>
          <Skeleton animation="wave" variant="rectangular" sx={{ height: '100%' }} />
        </S.MediaWrap>
        <S.Content>
          <S.TitleWrap>
            <Skeleton animation="wave" variant="text" />

            <Skeleton animation="wave" variant="text" sx={{ ml: '10px' }} />
          </S.TitleWrap>
          <S.DescWrap>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />

            <S.StoreInfoWrap>
              <Skeleton width={50} animation="wave" />
              <Skeleton width={50} animation="wave" />
            </S.StoreInfoWrap>
          </S.DescWrap>
          <Divider />
          <S.DeliveryInfo>
            <Skeleton width={50} animation="wave" />
            <Skeleton width={50} animation="wave" />
          </S.DeliveryInfo>
        </S.Content>
      </S.CustomCardAction>
    </S.CustomCard>
  )
}

export default StoreCardSkeleton
