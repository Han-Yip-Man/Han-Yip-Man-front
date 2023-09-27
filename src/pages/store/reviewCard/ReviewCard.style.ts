import { Box, Card, CardContent, Stack, styled } from '@mui/material'

export const CardWrap = styled(Card)`
  height: auto;
  display: 'flex';
  flex-direction: 'column';
  padding: 16px;
`

export const BuyerInfo = styled(Stack)`
  flex-direction: row;
  justify-content: baseline;
  > div {
  }
`

export const RatingBox = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  width: 160px;
  padding-top: 4px;
  > div {
    display: flex;
    align-items: center;
  }
`

export const ReviewContentWrap = styled(Stack)`
  height: auto;
  flex-direction: row;
  margin: 0;
`

export const CardMediaBox = styled(Box)`
  > img {
    border-radius: 16px;
    padding: 8px;
  }
  width: 30%;
  height: auto;
`

export const ReviewContent = styled(CardContent)`
  margin: 8px 0;
`
