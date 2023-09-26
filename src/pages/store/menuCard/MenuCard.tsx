import { CardMedia, Typography } from '@mui/material'
import * as S from './MenuCard.style'
import { menuInfo } from '../types'

type MenuCardProps = {
  menu: menuInfo
}

export const MenuCard = ({ menu }: MenuCardProps) => {
  return (
    <S.StyledCardContainer>
      <S.StyledCard>
        <S.StyledCardInnerContainer>
          <CardMedia
            component="img"
            alt="green iguana"
            height="100"
            image={menu.menuThumbnailUrl}
          />
          <S.StyledCardContent>
            <Typography variant="h6">{menu.menuName}</Typography>
            <Typography variant="body1">{menu.menuPrice}원</Typography>
            <Typography variant="body1">{menu.menuDiscountPrice}원</Typography>
          </S.StyledCardContent>
        </S.StyledCardInnerContainer>
      </S.StyledCard>
    </S.StyledCardContainer>
  )
}
