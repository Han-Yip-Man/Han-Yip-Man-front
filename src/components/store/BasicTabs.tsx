import {
  Box,
  Tabs,
  Tab,
  Typography,
  Stack,
  styled,
  Paper,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material'
import BasicAccordion from './BasicAccordion'
import { ReviewCard } from './ReviewCard'
import { KakaoMap } from '../../api/kakao.api'
import { SyntheticEvent, useState } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  getStoreDetail,
  getStoreMenus,
  getStoreReviews,
  getStoreReviewsInf,
} from '../../api/storeDetail'
import { useParams } from 'react-router-dom'
import { useIntersection } from '../../hooks'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

type StoreReview = {
  userId: number
  nickName: string
  reviewContent: string
  reviewScore: string
  createdAt: string
  reviewImageUrl: string
}

type StoreReviews = {
  cursor: number
  shopReviewsList: StoreReview[]
}

export default function BasicTabs() {
  const [tabValue, setTabValue] = useState(0)
  const { storeId } = useParams()
  const { data: menuData } = useQuery(['storeMenus', storeId], () => getStoreMenus(storeId))
  const { data: infoData } = useQuery(['stores', storeId], () => getStoreDetail(storeId))

  const {
    data: reviewInfData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['reviewsInf', storeId],
    queryFn: ({ pageParam = '' }) => getStoreReviewsInf(storeId, pageParam),
    getNextPageParam: (lastPage) => lastPage.cursor,
  })

  const ref = useIntersection(fetchNextPage, hasNextPage)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setTabValue(newValue)
  }

  return (
    <Box>
      <TabsWrap>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="메뉴" {...a11yProps(0)} />
          <Tab label="가게정보" {...a11yProps(1)} />
          <Tab label="리뷰" {...a11yProps(2)} />
        </Tabs>
      </TabsWrap>
      <CustomTabPanel value={tabValue} index={0}>
        {menuData
          ? menuData.map((menuList: any) => (
              <BasicAccordion key={menuList.menuGroupId} menuList={menuList} />
            ))
          : null}
        <InfoPaper>
          <InfoTitle variant="h6">원산지</InfoTitle>
          <Typography>대부분 국산 아님</Typography>
        </InfoPaper>
        <InfoPaper>
          <InfoTitle variant="h6">유의사항</InfoTitle>
          <Typography>메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다.</Typography>
        </InfoPaper>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <StoreInfoWrap>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StoreInfoPaper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableHead>
                        <InfoTitle variant="h6">영업 정보</InfoTitle>
                      </StyledTableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell>상호명</StyledTableCell>
                      <StyledTableCell>{infoData?.storeDetail.info.shopName}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>운영시간</StyledTableCell>
                      <StyledTableCell>00:00~23:59</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>휴무일</StyledTableCell>
                      <StyledTableCell>연중 무휴</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>전화 번호</StyledTableCell>
                      <StyledTableCell>02-1234-5678</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>사업자 번호</StyledTableCell>
                      <StyledTableCell>123-45-67890</StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </StoreInfoPaper>
              <StoreInfoPaper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableHead>
                        <InfoTitle variant="h6">위생 정보 내역</InfoTitle>
                      </StyledTableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell>CESCO</StyledTableCell>
                      <StyledTableCell>2023.09. 최근 해충방제 점검월</StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </StoreInfoPaper>
            </Grid>
          </Grid>
          <MapBox>
            <KakaoMap
              mapId={'map'}
              width="100%"
              height="350px"
              latitude={infoData?.storeDetail.info.shopAddressResponse.latitude}
              longitude={infoData?.storeDetail.info.shopAddressResponse.longitude}
            />
          </MapBox>
        </StoreInfoWrap>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <ReviewPaper>
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
          <ReviewObserver ref={ref}></ReviewObserver>
        </ReviewPaper>
      </CustomTabPanel>
    </Box>
  )
}

const StoreInfoWrap = styled(Stack)`
  color: rgba(0, 0, 0, 0.6);
  align-items: center;
`

const TabsWrap = styled(Box)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`

const InfoPaper = styled(Paper)`
  width: 100%;
  height: 150px;
  margin: 10px auto;
  padding: 20px;
`

const StoreInfoPaper = styled(Paper)`
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  margin: 10px auto;
`

const MapBox = styled(Paper)`
  width: 100%;
`

const InfoTitle = styled(Typography)`
  font-weight: bold;
  margin: 16px auto;
`

const StyledTableHead = styled(TableCell)`
  padding: 0;
  border-style: none;
`

const StyledTableCell = styled(TableCell)`
  border-bottom: none;
  padding: 4px;
`

const ReviewPaper = styled(Paper)`
  width: 100%;
  margin: 10px auto;
  padding: 20px;
`

const ReviewObserver = styled(Box)`
  height: 400px;
  width: 100px;
`
