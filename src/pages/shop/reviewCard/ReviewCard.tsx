import { Box, CardMedia, Rating, Typography } from '@mui/material'
import * as S from './ReviewCard.style'

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
      <S.CardWrap>
        <S.BuyerInfo>
          <Typography variant="h5" component="div">
            {review.nickName}님
          </Typography>
          <S.RatingBox>
            <Rating
              name="rating"
              defaultValue={Number(review.reviewScore)}
              precision={0.1}
              readOnly
            />
            <Typography variant="body1" component="div">
              {review.reviewScore}점
            </Typography>
          </S.RatingBox>
          <Typography variant="h6" component="div">
            {review.createdAt.slice(0, 10)}
          </Typography>
        </S.BuyerInfo>
        <S.ReviewContentWrap>
          <S.CardMediaBox>
            <CardMedia component="img" alt="review image" image={review.reviewImageUrl} />
          </S.CardMediaBox>
          <S.ReviewContent>
            <Typography variant="h5" color="text.secondary">
              {review.reviewContent}
            </Typography>
          </S.ReviewContent>
        </S.ReviewContentWrap>
      </S.CardWrap>
    </Box>
  )
}
