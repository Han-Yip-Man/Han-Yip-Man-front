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
          <Typography variant="h5" component="div">
            {review.nickName}님
          </Typography>
          <RatingBox>
            <Rating
              name="rating"
              defaultValue={Number(review.reviewScore)}
              precision={0.1}
              readOnly
            />
            <Typography variant="body1" component="div">
              {review.reviewScore}점
            </Typography>
          </RatingBox>
          <Typography variant="h6" component="div">
            {review.createdAt.slice(0, 10)}
          </Typography>
        </BuyerInfo>
        <ReviewContentWrap>
          <CardMediaBox>
            <CardMedia component="img" alt="review image" image={review.reviewImageUrl} />
          </CardMediaBox>
          <ReviewContent>
            <Typography variant="h5" color="text.secondary">
              {review.reviewContent}
            </Typography>
          </ReviewContent>
        </ReviewContentWrap>
      </CardWrap>
    </Box>
  )
}

const CardWrap = styled(Card)`
  height: auto;
  display: 'flex';
  flex-direction: 'column';
  padding: 16px;
`

const BuyerInfo = styled(Stack)`
  flex-direction: row;
  justify-content: baseline;
  > div {
  }
`

const RatingBox = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  width: 160px;
  padding-top: 4px;
  > div {
    display: flex;
    align-items: center;
  }
`

const ReviewContentWrap = styled(Stack)`
  height: auto;
  flex-direction: row;
  margin: 0;
`

const CardMediaBox = styled(Box)`
  > img {
    border-radius: 16px;
    padding: 8px;
  }
  width: 30%;
  height: auto;
`

const ReviewContent = styled(CardContent)`
  margin: 8px 0;
`
