import { Box, Tabs, Tab, Typography, Rating } from '@mui/material'
import BasicAccordion from './BasicAccordion'
import { ReviewCard } from './ReviewCard'
import { KakaoMap, UserSetAddressKakaoMap } from '../../api/kakao.api'
import { SyntheticEvent, useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="메뉴" {...a11yProps(0)} />
          <Tab label="가게정보" {...a11yProps(1)} />
          <Tab label="리뷰" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box>
          <BasicAccordion />
          <Box width={'100%'} height={'200px'} border={'1px solid'} borderColor={'#ccc'}>
            <Typography>원산지 대부분 국산 아님</Typography>
          </Box>
          <Box width={'100%'} height={'200px'} border={'1px solid'} borderColor={'#ccc'}>
            <Typography>유의사항 메뉴사진은 연출된 이미지로 실제 조리된 음삭과 다를 수 있습니다.</Typography>
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            운영시간 00:00~23:59
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            휴무일 연중 무휴
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            별점
            <Rating name="half-rating-read" defaultValue={5} precision={5} readOnly />
            5.0/5.0
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            전화 번호 02-1234-5678
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            사업자 번호 123-45-67890
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            유의사항
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            위치
          </Typography>
          <UserSetAddressKakaoMap mapId={'map1'} width="750px" height="350px" latitude={37.490569} longitude={127.032444} />
          <KakaoMap mapId={'map'} width="750px" height="350px" latitude={37.490569} longitude={127.032444} />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </CustomTabPanel>
    </Box>
  )
}
