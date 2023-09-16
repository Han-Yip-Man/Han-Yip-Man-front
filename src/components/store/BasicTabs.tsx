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
} from '@mui/material'
import BasicAccordion from './BasicAccordion'
import { ReviewCard } from './ReviewCard'
import { KakaoMap } from '../../api/kakao.api'
import { SyntheticEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStoreDetail, getStoreMenus } from '../../api/storeDetail'

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

export default function BasicTabs() {
  const [value, setValue] = useState(0)
  const [shopId] = useState(10)
  const { data: menuData } = useQuery(['storeMenus', shopId], () => getStoreMenus(shopId))
  const { data: infoData } = useQuery(['stores', shopId], () => getStoreDetail(shopId))

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue)
  }

  return (
    <Box>
      <TabsWrap>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="메뉴" {...a11yProps(0)} />
          <Tab label="가게정보" {...a11yProps(1)} />
          <Tab label="리뷰" {...a11yProps(2)} />
        </Tabs>
      </TabsWrap>
      <CustomTabPanel value={value} index={0}>
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
          <Typography>
            <InfoTitle variant="h6">유의사항</InfoTitle>
            메뉴사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다.
          </Typography>
        </InfoPaper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StoreInfoWrap>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table>
                <TableBody>
                  <StoreInfoPaper>
                    <TableRow>
                      <InfoTitle variant="h6">영업 정보</InfoTitle>
                    </TableRow>
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
                  </StoreInfoPaper>
                  <StoreInfoPaper>
                    <TableRow>
                      <InfoTitle variant="h6">위생 정보 내역</InfoTitle>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>CESCO</StyledTableCell>
                      <StyledTableCell>2023.08. 최근 해충방제 점검월</StyledTableCell>
                    </TableRow>
                  </StoreInfoPaper>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <MapBox>
            {/* <MapTitle variant="h6">위치</MapTitle> */}
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
      <CustomTabPanel value={value} index={2}>
        <ReviewPaper>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
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

// const MapTitle = styled(Typography)`
//   font-weight: bold;
//   margin: 16px 16px;
// `

const StyledTableCell = styled(TableCell)`
  border-bottom: none;
  padding: 4px;
`

const ReviewPaper = styled(Paper)`
  width: 100%;
  margin: 10px auto;
  padding: 20px;
`
