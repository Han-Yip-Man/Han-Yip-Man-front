import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import * as S from './MenuCard.style'

type MenuCardProps = {
  menu: {
    menuDescription: string
    menuDiscountPrice: number
    menuId: number
    menuName: string
    menuPrice: number
    menuThumbnailUrl: string
  }
}

export const MenuCard = ({ menu }: MenuCardProps) => {
  return (
    <S.StyledCardContainer>
      <Card sx={{ height: 116, padding: 1 }}>
        <S.StyledCardInnerContainer>
          <CardMedia
            component="img"
            alt="green iguana"
            height="100"
            image={menu.menuThumbnailUrl}
          />
          <CardContent sx={{ width: '300%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{menu.menuName}</Typography>
            <Typography variant="body1">{menu.menuPrice}원</Typography>
            <Typography variant="body1">{menu.menuDiscountPrice}원</Typography>
          </CardContent>
        </S.StyledCardInnerContainer>
      </Card>
    </S.StyledCardContainer>
  )
}
