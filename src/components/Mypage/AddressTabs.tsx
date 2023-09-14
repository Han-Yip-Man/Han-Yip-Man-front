import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import kakaoApi, { KakaoMap, UserSetAddressKakaoMap } from '../../api/kakao.api'
import { useForm } from 'react-hook-form'
import { Stack } from '@mui/material'

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

type Address = {
  addressNumber: number
  address: string
  detailAddress: string
  latitude: number
  longitude: number
  isDefault: boolean
}

type AddressTabsProps = {
  addressList: Address[] | undefined
}

type FormValues = {
  address: string
  detailAddress: string
  latitude: number
  longitude: number
}

export default function AddressTabs({ addressList }: AddressTabsProps) {
  const { register, handleSubmit, watch, setValue, getValues } = useForm<FormValues>()

  const findAddressLatLng = () => {
    const geocoder = new kakaoApi.kakao.maps.services.Geocoder()

    const callback = (result: any, status: any) => {
      if (status === kakaoApi.kakao.maps.services.Status.OK) {
        setValue('latitude', result[0].y)
        setValue('longitude', result[0].x)
      }
    }

    geocoder.addressSearch(watch()['address'], callback)
  }

  const [tabValue, setTabValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ width: '600px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
          {addressList?.map((adres, index) => (
            <Tab label={`주소 ${index + 1}`} {...a11yProps(index)} />
          ))}
          {addressList && addressList?.length < 3 ? (
            <Tab label={`+`} {...a11yProps(addressList.length)} />
          ) : null}
        </Tabs>
      </Box>
      {addressList?.map((adres, index) => (
        <>
          <CustomTabPanel value={tabValue} index={index}>
            {adres.isDefault ? <p>기본 주소</p> : null}
            {`주소: ${adres.address}, ${adres.detailAddress}`}
            <KakaoMap
              mapId={`address-map${index}`}
              width={'550px'}
              height={'300px'}
              latitude={adres.latitude}
              longitude={adres.longitude}
            />
          </CustomTabPanel>
        </>
      ))}
      {addressList && addressList?.length < 3 ? (
        <CustomTabPanel value={tabValue} index={addressList.length}>
          <p>주소 입력</p>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Stack flexDirection={'row'}>
              <label htmlFor="address">주소</label>
              <input type="text" id="address" {...register('address')} />
            </Stack>
            <Stack flexDirection={'row'}>
              <label htmlFor="address-detail">상세주소</label>
              <input type="text" id="address" {...register('detailAddress')} />
            </Stack>
            <input type="hidden" {...register('latitude')} />
            <input type="hidden" {...register('longitude')} />

            <input type="button" value="주소찾기" onClick={findAddressLatLng} />
            <input type="submit" value="주소등록" />
          </form>

          <UserSetAddressKakaoMap
            mapId={`add-address-map`}
            width={'550px'}
            height={'300px'}
            latitude={getValues('latitude')}
            longitude={getValues('longitude')}
            // latitude={37.551843}
            // longitude={126.975791}
          />
        </CustomTabPanel>
      ) : null}
    </Box>
  )
}
