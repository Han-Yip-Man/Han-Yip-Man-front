import { Avatar, Paper, Stack, TableCell, Typography, styled } from '@mui/material'

export const MypageWrap = styled(Stack)`
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 5%;
`

export const CustomerInfoTitle = styled(Typography)`
  margin-right: 80%;
  margin-bottom: 20px;
`

export const CustomerInfo = styled(Paper)`
  width: 100%;
  margin: 20px 10px 40px 10px;
`

export const CustomerInfoInner = styled(Stack)`
  padding: 8px;
  flex-direction: row;
`

export const AvatarWarp = styled(Stack)`
  width: 200;
  padding: 32px;
  flex-direction: column;
  align-items: center;
`

export const AvatarPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledAvatar = styled(Avatar)`
  width: 130px;
  height: 130px;
`

export const Nickname = styled(Typography)`
  display: inline-box;
  margin: 16px;
`
export const StyledTableCell = styled(TableCell)`
  border-bottom: none;
`

export const ReviewPaper = styled(Paper)`
  width: 100%;
  margin: 20px 10px;
`
