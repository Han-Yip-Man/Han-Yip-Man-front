import BasicTabs from '../components/store/BasicTabs'
import { Box, CardMedia, Rating, Stack, Typography, styled } from '@mui/material'

export const Store = () => {
  return (
    <StoreWrap>
      <Box>
        <CardMedia component="img" image="/src/assets/pizzahut.png" alt="banner" />
      </Box>
      <StyledStoreInfoBox>
        <Typography variant="h4">피자헛 피자 어느 지점</Typography>
        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        <Typography>리뷰 N개</Typography>
      </StyledStoreInfoBox>
      <BasicTabs />
    </StoreWrap>
  )
}

const StoreWrap = styled(Stack)`
  width: 100%;
  background-color: white;
`

const StyledStoreInfoBox = styled(Stack)`
  padding: 10px;
  align-items: center;
`
