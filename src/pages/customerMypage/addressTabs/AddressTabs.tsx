import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import kakaoApi, { KakaoMap, UserSetAddressKakaoMap } from '../../../api/kakao.api'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Autocomplete, Button, Stack, TextField } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useAlert, useDebounce } from '../../common/hooks'
import { userInfo } from '../../../atoms/userInfoAtoms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserAddr, regUserAddrPost } from '../../../api/address'
import { currentAddr, userAddr } from '../../../atoms/addressAtoms'
import searchAddressByKeyword from '../../../api/addressSearch'
import * as S from './AddressTabs.style'
import { Address, AddressFormValues } from '../types'

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

type AddressTabsProps = {
  addressList: Address[] | undefined
}

export default function AddressTabs({ addressList }: AddressTabsProps) {
  const isLoggedIn = useRecoilValue(userInfo)
  const [currentUserAddr, setCurrentUserAddr] = useRecoilState(userAddr)
  const [nonAddrList, setNonAddrList] = useRecoilState(currentAddr)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const { debouncedKeyword, isLoading: addrLoading } = useDebounce(searchKeyword, 600)
  const [addrData, setAddrData] = useState([])
  const [selectedAddr, setSelectedAddr] = useState<CurrentAddr>()
  const toast = useAlert()

  const mutation = useMutation(regUserAddrPost)
  const { data } = useQuery<UserAddr[]>(['modalAddr'], getUserAddr, {
    enabled: !!isLoggedIn,
  })

  const qc = useQueryClient()

  const handleAddrChange = (_: React.SyntheticEvent<any>, keyword: string) => {
    if (!keyword) return
    setSearchKeyword(keyword)
  }

  const handleAddrSubmit = () => {
    if (isLoggedIn) {
      if (selectedAddr) {
        const { address, place_name, lat, lng, road_address, id } = selectedAddr
        mutation
          .mutateAsync(
            `address=${address}&addressDetail=${place_name}&latitude=${lat}&longitude=${lng}&roadAddress=${road_address}&mapId=${id}`,
          )
          .then(() => {
            setCurrentUserAddr(selectedAddr)
            qc.invalidateQueries(['modalAddr'])
          })
          .catch((e) => {
            toast(e.response.data.message, 3000, 'error')
          })
      }
    } else {
      if (!selectedAddr) return
      const filterAddr = nonAddrList.filter((addr) => addr.id === selectedAddr.id)
      if (filterAddr.length > 0) {
        toast('이미 존재하는 주소 입니다.', 3000, 'warning')
        return
      }
      setSearchKeyword('')
      setNonAddrList((prev) => [...prev, selectedAddr] as CurrentAddr[])
      toast('주소를 등록했습니다.', 3000, 'success')
    }
  }

  useEffect(() => {
    if (!debouncedKeyword) return
    searchAddressByKeyword(debouncedKeyword, (result: any) => {
      setAddrData(() => result)
    })
    // console.log('디바운싱')
  }, [debouncedKeyword])

  useEffect(() => {
    if (data) {
      const currentAddr = data.filter(({ isDefault }) => isDefault)[0]
      const mappedAddr = {
        id: currentAddr.mapId,
        address: currentAddr.address,
        road_address: currentAddr.roadAddress,
        place_name: currentAddr.addressDetail,
        lat: currentAddr.latitude.toFixed(13),
        lng: currentAddr.longitude.toFixed(13),
        isDefault: true,
      }
      setCurrentUserAddr(mappedAddr)
    }
  }, [data])

  useEffect(() => {
    if (!isLoggedIn) {
      setNonAddrList([currentUserAddr])
    }
  }, [])

  useEffect(() => {}, [selectedAddr])

  /**
   * 주소지 관련 새로 가져와서 일부 생략
   * 코드 보존 위해 그냥 둠 line 273:285
   */
  const { register, handleSubmit, watch, setValue, getValues } = useForm<AddressFormValues>()

  const findAddressLatLng = () => {
    console.log(watch())
    const geocoder = new kakaoApi.kakao.maps.services.Geocoder()

    const callback = (result: any, status: any) => {
      if (status === kakaoApi.kakao.maps.services.Status.OK) {
        console.log(result)
        setValue('latitude', result[0].y)
        setValue('longitude', result[0].x)
      }
    }

    geocoder.addressSearch(watch()['address'], callback)
  }

  const [tabValue, setTabValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleOnchange = (value: NonNullable<string | DataType>) => {
    if (typeof value === 'string' || !value) return
    setSelectedAddr({
      id: value.id,
      address: value.address_name,
      road_address: value.road_address_name,
      place_name: value.place_name,
      lat: value.y,
      lng: value.x,
      isDefault: false,
    })
  }

  return (
    <Box sx={{ width: '600px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
          {addressList?.map((adres, index) => (
            <Tab key={index} label={`주소 ${index + 1}`} {...a11yProps(index)} />
          ))}
          {addressList && addressList?.length < 3 ? (
            <Tab label={`+`} {...a11yProps(addressList.length)} />
          ) : null}
        </Tabs>
      </Box>
      {addressList?.map((adres, index) => (
        <CustomTabPanel key={index} value={tabValue} index={index}>
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
      ))}
      {addressList && addressList?.length < 3 ? (
        <CustomTabPanel value={tabValue} index={addressList.length}>
          {/* <p>주소 입력</p> */}
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <S.Search>
              <Autocomplete
                sx={{ width: '100%' }}
                freeSolo
                disableClearable
                loading={addrLoading}
                id="address"
                options={addrData.map((addr: DataType) => addr)} // top100Films.map((option) => option.title) 이런식으로 주소검색 데이터 받아와서 옵션 그려줌
                getOptionLabel={(addr: DataType | string) => {
                  if (typeof addr === 'string') return addr
                  return `${addr.place_name} ${addr.address_name}`
                }}
                renderOption={(props, option) => {
                  return (
                    <li
                      {...props}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                      <Typography>{option.place_name}</Typography>
                      <Typography sx={{ fontSize: '10px', color: 'gray' }}>
                        {option.address_name}
                      </Typography>
                    </li>
                  )
                }}
                onInputChange={handleAddrChange}
                onChange={(_, value) => {
                  handleOnchange(value)
                }}
                renderInput={(param) => (
                  <TextField
                    {...param}
                    label="주소 입력"
                    placeholder="지번,도로명,건물명으로 검색"
                  />
                )}
              />
              <S.CustomBtn variant="outlined" onClick={handleAddrSubmit}>
                등록
              </S.CustomBtn>
            </S.Search>

            {/* <Stack flexDirection={'row'}>
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
            <input type="submit" value="주소등록" /> */}
          </form>

          {/**
           * 공통적으로 User~ Deli~ 둘 다 위도 경도 받아서 마커 표시하기
           * 필요하고
           * 
           * User~ 는 지금 이 파일에서 쓰이는데
           *  지도 <=> 인풋 서로 위도경도 공유? 비슷하게 
           * 1. 인풋에서 주소 선택 시 지도로 위도경도 보내서 지도 이동 및 마커표시
           * 2. 지도를 이동해서 중앙좌표값(위도경도) Autocomplete이쪽으로 데이터 보내주기
           * 
           *   const [selectedAddr, setSelectedAddr] = useState<CurrentAddr>()
           * 
                declare interface CurrentAddr {
                  id: string
                  address: string
                  road_address: string
                  place_name: string
                  lat: string
                  lng: string
                  isDefault: boolean
                }
           * 
           *  */}
          <UserSetAddressKakaoMap
            mapId={`add-address-map`}
            width={'550px'}
            height={'300px'}
            // latitude={getValues('latitude') ? getValues('latitude') : 37.551843}
            // longitude={getValues('longitude') ? getValues('longitude') : 126.975791}
            latitude={selectedAddr?.lat ? +selectedAddr?.lat : 37.551843}
            longitude={selectedAddr?.lng ? +selectedAddr?.lng : 126.975791}
          />
        </CustomTabPanel>
      ) : null}
    </Box>
  )
}
