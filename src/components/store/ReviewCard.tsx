import { Box, Card, CardContent, CardMedia, Rating, Stack, Typography, styled } from '@mui/material'

type ReviewCardProps = {
  review: {
    userId: number
    nickName: string
    reviewContent: string
    reviewScore: string
    createdAt: string
    reviewImageUrl: string
  }
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Box margin={1}>
      <CardWrap>
        <BuyerInfo>
          <Typography gutterBottom variant="h5" component="div">
            {review.nickName}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <Rating
              name="rating"
              defaultValue={Number(review.reviewScore)}
              precision={0.1}
              readOnly
            />
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {review.createdAt.slice(0, 10)}
          </Typography>
        </BuyerInfo>
        <ReviewContentWrap>
          <CardMedia
            component="img"
            alt="green iguana"
            height="150"
            image={review.reviewImageUrl}
          />
          <ReviewContent>
            <Typography variant="body2" color="text.secondary">
              {review.reviewContent}
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
