import { Box, Card, CardContent, CardMedia, Typography, styled } from '@mui/material'

export const MenuCard = () => {
  return (
    <StyledCardContainer>
      <Card sx={{ height: 116, padding: 1 }}>
        <StyledCardInnerContainer>
          <CardMedia
            component="img"
            alt="green iguana"
            height="100"
            image="/src/assets/domino.jpg"
          />
          <CardContent sx={{ width: '300%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">씨푸드킹 L</Typography>
            <Typography variant="body1">36,900원</Typography>
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
