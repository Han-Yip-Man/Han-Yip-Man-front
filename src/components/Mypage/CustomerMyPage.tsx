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
import { useQuery } from '@tanstack/react-query'
import { getMypageInfo } from '../../api/mypage'
import AddressTabs from './AddressTabs'

export const CustomerMyPage = () => {
  const { data } = useQuery(['mypage'], () => getMypageInfo())

  return (
    <>
      {data && (
        <MypageWrap>
          <CustomerInfoTitle variant="h5">내 정보</CustomerInfoTitle>
          <CustomerInfo>
            <CustomerInfoInner>
              <AvatarWarp>
                <AvatarPaper>
                  <StyledAvatar alt={'' + data?.buyNumber} src={data?.profileImageUrl} />
                  <Nickname variant="h5">{data?.nickName}</Nickname>
                </AvatarPaper>
              </AvatarWarp>
              <Stack bgcolor={'white'} flexDirection={'column'} justifyContent={'center'}>
                <Table>
                  <TableBody>
                    <TableRow key={data?.email}>
                      <StyledTableCell>
                        <Typography>EMAIL :</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography> {data?.email}</Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow key={data?.phoneNumber}>
                      <StyledTableCell>
                        <Typography>PHONE :</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography> {data?.phoneNumber}</Typography>
                      </StyledTableCell>
                    </TableRow>
                    {data?.addressList
                      ?.filter((addressInfo) => addressInfo.isDefault)
                      .map((addresss) => (
                        <TableRow key={addresss.address}>
                          <StyledTableCell>
                            <Typography>ADDRESS :</Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography> {addresss.address}</Typography>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    {data?.addressList
                      ?.filter((addressInfo) => addressInfo.isDefault)
                      .map((addresss) => (
                        <TableRow key={addresss.detailAddress}>
                          <StyledTableCell>
                            <Typography>DETAIL ADDRESS :</Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography> {addresss.detailAddress}</Typography>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Stack>
            </CustomerInfoInner>
          </CustomerInfo>
          <CustomerInfoTitle variant="h5">주소관리</CustomerInfoTitle>
          <Stack>
            <AddressTabs addressList={data?.addressList} />
          </Stack>
          <CustomerInfoTitle variant="h5">리뷰관리</CustomerInfoTitle>
          <ReviewPaper>
            {/* <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard /> */}
          </ReviewPaper>
        </MypageWrap>
      )}
    </>
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
