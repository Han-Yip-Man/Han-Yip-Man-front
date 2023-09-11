import {
  Avatar,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from '@mui/material'
import { ReviewCard } from '../store/ReviewCard'

export const CustomerMyPage = () => {
  return (
    <MypageWrap>
      <CustomerInfoTitle variant="h5">내 정보</CustomerInfoTitle>
      <CustomerInfo>
        <CustomerInfoInner>
          <AvatarWarp>
            <AvatarPaper>
              <StyledAvatar />
              <Nickname variant="h5">ninkname</Nickname>
            </AvatarPaper>
          </AvatarWarp>
          <Stack bgcolor={'white'} flexDirection={'column'} justifyContent={'center'}>
            <Table>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    <Typography>ID :</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography> id</Typography>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <Typography>PHONE :</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography> 010-1234-5678</Typography>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <Typography>ADDRESS :</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography> 서울특별시 강남구 역삼동 837-24</Typography>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <Typography>DETAIL ADDRESS :</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography> 9F</Typography>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </CustomerInfoInner>
      </CustomerInfo>
      <CustomerInfoTitle variant="h5">리뷰관리</CustomerInfoTitle>
      <ReviewPaper>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </ReviewPaper>
    </MypageWrap>
  )
}

const MypageWrap = styled(Stack)`
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 5%;
`

const CustomerInfoTitle = styled(Typography)`
  margin-right: 80%;
  margin-bottom: 20px;
`

const CustomerInfo = styled(Paper)`
  width: 100%;
  margin: 20px 10px 40px 10px;
`

const CustomerInfoInner = styled(Stack)`
  padding: 8px;
  flex-direction: row;
`

const AvatarWarp = styled(Stack)`
  width: 200;
  padding: 32px;
  flex-direction: column;
  align-items: center;
`

const AvatarPaper = styled(Paper)`
  padding: 16px;
`

const StyledAvatar = styled(Avatar)`
  width: 130px;
  height: 130px;
`

const Nickname = styled(Typography)`
  display: inline-box;
  margin: 16px;
`
const StyledTableCell = styled(TableCell)`
  border-bottom: none;
`

const ReviewPaper = styled(Paper)`
  width: 100%;
  margin: 20px 10px;
`
