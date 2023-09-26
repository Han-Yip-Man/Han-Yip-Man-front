import { Stack, Table, TableBody, TableRow, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getMypageInfo } from '../hooks/mypage'
import AddressTabs from '../addressTabs/AddressTabs'
import * as S from './CustomerMyPageInfo.style'

export const CustomerMyPageInfo = () => {
  const { data } = useQuery(['mypage'], () => getMypageInfo())

  return (
    <>
      {data && (
        <S.MypageWrap>
          <S.CustomerInfoTitle variant="h5">내 정보</S.CustomerInfoTitle>
          <S.CustomerInfo>
            <S.CustomerInfoInner>
              <S.AvatarWarp>
                <S.AvatarPaper>
                  <S.StyledAvatar alt={'' + data?.buyNumber} src={data?.profileImageUrl} />
                  <S.Nickname variant="h5">{data?.nickName}</S.Nickname>
                </S.AvatarPaper>
              </S.AvatarWarp>
              <Stack bgcolor={'white'} flexDirection={'column'} justifyContent={'center'}>
                <Table>
                  <TableBody>
                    <TableRow key={data?.email}>
                      <S.StyledTableCell>
                        <Typography>EMAIL :</Typography>
                      </S.StyledTableCell>
                      <S.StyledTableCell>
                        <Typography> {data?.email}</Typography>
                      </S.StyledTableCell>
                    </TableRow>
                    <TableRow key={data?.phoneNumber}>
                      <S.StyledTableCell>
                        <Typography>PHONE :</Typography>
                      </S.StyledTableCell>
                      <S.StyledTableCell>
                        <Typography> {data?.phoneNumber}</Typography>
                      </S.StyledTableCell>
                    </TableRow>
                    {data?.addressList
                      ?.filter((addressInfo) => addressInfo.isDefault)
                      .map((addresss) => (
                        <TableRow key={addresss.address}>
                          <S.StyledTableCell>
                            <Typography>ADDRESS :</Typography>
                          </S.StyledTableCell>
                          <S.StyledTableCell>
                            <Typography> {addresss.address}</Typography>
                          </S.StyledTableCell>
                        </TableRow>
                      ))}
                    {data?.addressList
                      ?.filter((addressInfo) => addressInfo.isDefault)
                      .map((addresss) => (
                        <TableRow key={addresss.detailAddress}>
                          <S.StyledTableCell>
                            <Typography>DETAIL ADDRESS :</Typography>
                          </S.StyledTableCell>
                          <S.StyledTableCell>
                            <Typography> {addresss.detailAddress}</Typography>
                          </S.StyledTableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Stack>
            </S.CustomerInfoInner>
          </S.CustomerInfo>
          <S.CustomerInfoTitle variant="h5">주소관리</S.CustomerInfoTitle>
          <Stack>
            <AddressTabs addressList={data?.addressList} />
          </Stack>
          <S.CustomerInfoTitle variant="h5">리뷰관리</S.CustomerInfoTitle>
          <S.ReviewPaper>
            {/* <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard /> */}
          </S.ReviewPaper>
        </S.MypageWrap>
      )}
    </>
  )
}
