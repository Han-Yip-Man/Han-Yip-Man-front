import { Box, Card, CardContent, CardMedia, Rating, Stack, Typography, styled } from '@mui/material'

export const ReviewCard = () => {
  return (
    <Box margin={1}>
      <CardWrap>
        <BuyerInfo>
          <Typography gutterBottom variant="h5" component="div">
            ID
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <Rating name="half-rating-read" defaultValue={5} precision={5} readOnly />
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Few Days Ago
          </Typography>
        </BuyerInfo>
        <ReviewContentWrap>
          <CardMedia
            component="img"
            alt="green iguana"
            height="150"
            image="/src/assets/pizzahut.png"
          />
          <ReviewContent>
            <Typography gutterBottom variant="h5" component="div">
              너무 맛있어요
            </Typography>
            <Typography variant="body2" color="text.secondary">
              사장님이 친절하고 피자가 맛있어오 정말 쵝오의 피자
            </Typography>
          </ReviewContent>
        </ReviewContentWrap>
      </CardWrap>
    </Box>
  )
}

const CardWrap = styled(Card)`
  height: 210;
  display: 'flex';
  flex-direction: 'column';
  padding: 8px;
`

const BuyerInfo = styled(Stack)`
  flex-direction: row;
  justify-content: baseline;
`

const ReviewContentWrap = styled(Stack)`
  height: 150;
  flex-direction: row;
`

const ReviewContent = styled(CardContent)`
  width: 200%;
`
