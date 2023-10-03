import { Box, Typography, Stack, styled, Paper, TableCell } from '@mui/material'

export const ShopInfoWrap = styled(Stack)`
  color: rgba(0, 0, 0, 0.6);
  align-items: center;
`

export const TabsWrap = styled(Box)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`

export const InfoPaper = styled(Paper)`
  width: 100%;
  height: 150px;
  margin: 10px auto;
  padding: 20px;
`

export const ShopInfoPaper = styled(Paper)`
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  margin: 10px auto;
`

export const MapBox = styled(Paper)`
  width: 100%;
`

export const InfoTitle = styled(Typography)`
  font-weight: bold;
  margin: 16px auto;
`

export const StyledTableHead = styled(TableCell)`
  padding: 0;
  border-style: none;
`

export const StyledTableCell = styled(TableCell)`
  border-bottom: none;
  padding: 4px;
`

export const ReviewPaper = styled(Paper)`
  width: 100%;
  margin: 10px auto;
  padding: 20px;
`

export const ReviewObserver = styled(Box)``
