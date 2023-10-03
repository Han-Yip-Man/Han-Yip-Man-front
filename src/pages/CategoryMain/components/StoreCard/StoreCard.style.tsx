import styled from '@emotion/styled'
import { Card, Chip, CardActionArea, CardContent, CardMedia } from '@mui/material'
import Typography from '@mui/material/Typography'

export const CustomCard = styled(Card)``

export const CustomCardAction = styled(CardActionArea)`
  height: 100%;
`
export const MediaWrap = styled.div`
  height: 140px;
`
export const Media = styled(CardMedia)`
  height: 100%;
  background-color: gray;
`
export const TitleWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 78px;
  padding-right: 5px;
`

export const Title = styled(Typography)`
  overflow: hidden;
`

export const ChipWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 11px;
  width: 100%;
`

export const CustomChip = styled(Chip)`
  height: 20px;
  padding-bottom: 3px;
  font-size: 11px;
`

export const DescWrap = styled.div``

export const StoreDesc = styled(Typography)`
  height: 40px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const StoreInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 3px;
`

export const ReviewCount = styled(Typography)`
  font-size: 12px;
`
export const Estimated = styled(Typography)`
  font-size: 12px;
`
export const DeliveryInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
`
export const MinOrder = styled(Typography)`
  font-size: 12px;
`
export const DeliveryFee = styled(Typography)`
  font-size: 12px;
`

export const Content = styled(CardContent)``

// export const Content = styled.div`
//   height: 300px;
//   background-color: gray;
//   border-radius: 20px;
//   cursor: pointer;
// `
