import { Card, Paper, Stack, styled } from '@mui/material'

export const OrderDetailWrap = styled(Stack)`
  margin: 16px;
`

export const OrderInfoStack = styled(Stack)`
  margin: 16px 0;
  > div.MuiTypography-root {
    margin-top: 30px;
  }
`

export const OrderInfoPaper = styled(Paper)`
  padding: 16px;
`

export const DeliveryMapStack = styled(Stack)`
  margin: 16px 0;
  > div > div {
    margin-left: 10px;
  }
`

// export const StyledChip = styled(Chip)((props)=>({
//   backgroundColor: #ffcd05;
// }))

export const PaymentsStack = styled(Stack)`
  margin: 16px 0;
`

export const PaymentInfoPaper = styled(Paper)`
  padding: 16px;
`

export const OrderListInfoStack = styled(Stack)`
  margin: 16px 0;
`

export const OrderListCard = styled(Card)`
  margin-top: 20px;
`

export const ReviwFormStack = styled(Stack)`
  margin: 16px 0;
`
