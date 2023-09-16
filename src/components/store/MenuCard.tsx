import { Box, Card, CardContent, CardMedia, Typography, styled } from '@mui/material'

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
    <StyledCardContainer>
      <Card sx={{ height: 116, padding: 1 }}>
        <StyledCardInnerContainer>
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
        </StyledCardInnerContainer>
      </Card>
    </StyledCardContainer>
  )
}

const StyledCardContainer = styled(Box)`
  margin: 1;
  width: 100%;
`

const StyledCardInnerContainer = styled(Box)`
  height: 110;
  display: flex;
  flex-direction: row;
`
