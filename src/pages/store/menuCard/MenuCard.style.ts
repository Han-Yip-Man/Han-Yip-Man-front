import { Box, Card, CardContent, styled } from '@mui/material'

export const StyledCardContainer = styled(Box)`
  margin: 1;
  width: 100%;
`

export const StyledCard = styled(Card)`
  height: 116px;
  padding: 8px;
`

export const StyledCardInnerContainer = styled(Box)`
  height: 110;
  display: flex;
  flex-direction: row;
`

export const StyledCardContent = styled(CardContent)`
  width: 300%;
  display: flex;
  flex-direction: column;
`
