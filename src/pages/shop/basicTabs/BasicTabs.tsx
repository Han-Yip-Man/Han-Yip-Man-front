import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
} from '@mui/material'
import BasicAccordion from '../basicAccordion/BasicAccordion'
import { ReviewCard } from '../reviewCard/ReviewCard'
import { KakaoMap } from '../../../api/kakao.api'
import { SyntheticEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useIntersection } from '../../common/hooks'
import * as S from './BasicTabs.style'
import CustomTabPanel from '../customTabPanel/CustomTabPanel'
import useMenu from '../hooks/useMenu'
import useShop from '../hooks/useShop'
import useReview from '../hooks/useReview'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs() {
  const [tabValue, setTabValue] = useState(0)
  const { shopId } = useParams()
  const { data: menuData } = useMenu(Number(shopId))
  const { data: infoData } = useShop(Number(shopId))
  const { data: reviewInfData, fetchNextPage, hasNextPage, isFetching } = useReview(Number(shopId))

  const ref = useIntersection(fetchNextPage, hasNextPage)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setTabValue(newValue)
  }

  return (
    <Box>
      <S.TabsWrap>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="메뉴" {...a11yProps(0)} />
          <Tab label="가게정보" {...a11yProps(1)} />
          <Tab label="리뷰" {...a11yProps(2)} />
        </Tabs>
      </S.TabsWrap>
      <CustomTabPanel value={tabValue} index={0}>
        {menuData
          ? menuData.map((menuList: any) => (
              <BasicAccordion key={menuList.menuGroupId} menuList={menuList} />
            ))
          : null}
        <S.InfoPaper>
          <S.InfoTitle variant="h6">원산지</S.InfoTitle>
          <Typography>대부분 국산 아님</Typography>
        </S.InfoPaper>
        <S.InfoPaper>
          <S.InfoTitle variant="h6">유의사항</S.InfoTitle>
          <Typography>메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다.</Typography>
        </S.InfoPaper>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <S.ShopInfoWrap>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <S.ShopInfoPaper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <S.StyledTableHead>
                        <S.InfoTitle variant="h6">영업 정보</S.InfoTitle>
                      </S.StyledTableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <S.StyledTableCell>상호명</S.StyledTableCell>
                      <S.StyledTableCell>{infoData?.shopDetail.info.shopName}</S.StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <S.StyledTableCell>운영시간</S.StyledTableCell>
                      <S.StyledTableCell>00:00~23:59</S.StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <S.StyledTableCell>휴무일</S.StyledTableCell>
                      <S.StyledTableCell>연중 무휴</S.StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <S.StyledTableCell>전화 번호</S.StyledTableCell>
                      <S.StyledTableCell>02-1234-5678</S.StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <S.StyledTableCell>사업자 번호</S.StyledTableCell>
                      <S.StyledTableCell>123-45-67890</S.StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </S.ShopInfoPaper>
              <S.ShopInfoPaper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <S.StyledTableHead>
                        <S.InfoTitle variant="h6">위생 정보 내역</S.InfoTitle>
                      </S.StyledTableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <S.StyledTableCell>CESCO</S.StyledTableCell>
                      <S.StyledTableCell>2023.10. 최근 해충방제 점검월</S.StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </S.ShopInfoPaper>
            </Grid>
          </Grid>
          <S.MapBox>
            <KakaoMap
              mapId={'map'}
              width="100%"
              height="350px"
              latitude={infoData?.shopDetail.info.shopAddressResponse.latitude}
              longitude={infoData?.shopDetail.info.shopAddressResponse.longitude}
            />
          </S.MapBox>
        </S.ShopInfoWrap>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <S.ReviewPaper>
          {isFetching && !reviewInfData ? (
            <div>Loading...</div>
          ) : (
            <div>
              {reviewInfData?.pages.map((page) =>
                page.shopReviewsList.map((review: any) => (
                  <ReviewCard key={review.createdAt} review={review} />
                )),
              )}
            </div>
          )}
          <S.ReviewObserver ref={ref}></S.ReviewObserver>
        </S.ReviewPaper>
      </CustomTabPanel>
    </Box>
  )
}
