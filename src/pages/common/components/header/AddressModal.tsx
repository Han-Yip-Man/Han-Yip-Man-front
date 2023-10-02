import styled from '@emotion/styled'
import { Typography, TextField, Autocomplete, Button, List } from '@mui/material'
import AddressListItem from './AddressListItem'

import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfo } from '../../../../atoms/userInfoAtoms'
import { currentAddr, userAddr } from '../../../../atoms/addressAtoms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAlert, useDebounce } from '../../hooks'
import searchAddressByKeyword from '../../../../api/addressSearch'
import { getUserAddr, regUserAddrPost } from '../../../../api/address'

function AddressModal() {
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

  console.log(nonAddrList)

  const handleChange = (_: React.SyntheticEvent<any>, keyword: string) => {
    if (!keyword) return
    setSearchKeyword(keyword)
  }

  const handleSubmit = () => {
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
            qc.invalidateQueries(['category'])
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
    console.log('디바운싱')
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
    if (!isLoggedIn && nonAddrList.length === 0) {
      setNonAddrList([currentUserAddr])
    }
  }, [])

  return (
    <Wrap>
      <Header>
        <Title>
          <Typography>주소 설정</Typography>
        </Title>
        <Search>
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
            onInputChange={handleChange}
            onChange={(_, value) => {
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
            }}
            renderInput={(param) => (
              <TextField {...param} label="주소 입력" placeholder="지번,도로명,건물명으로 검색" />
            )}
          />
          <CustomBtn variant="outlined" onClick={handleSubmit}>
            등록
          </CustomBtn>
        </Search>
      </Header>
      <List dense={true}>
        {isLoggedIn && data
          ? data.map((addr: UserAddr) => (
              <AddressListItem
                key={addr.mapId}
                id={addr.mapId}
                address={addr.address}
                place_name={addr.addressDetail}
                road_address={addr.roadAddress}
                isLoggedIn={isLoggedIn}
                isDefault={addr.isDefault}
                lat={addr.latitude.toFixed(13)}
                lng={addr.longitude.toFixed(13)}
                addressId={addr.addressId}
              />
            ))
          : nonAddrList.map((addr) => (
              <AddressListItem key={addr.id} {...addr} isLoggedIn={isLoggedIn} />
            ))}
      </List>
    </Wrap>
  )
}

export default AddressModal

const Wrap = styled.div`
  min-height: 500px;
  max-height: 500px;
  width: 400px;
  position: relative;
`
const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
  padding-bottom: 10px;
`

const Title = styled.div`
  display: grid;
  place-items: center;
  padding-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
`
const Search = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  padding-left: 10px;
  padding-right: 10px;
  place-items: center;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;

  & label.Mui-focused {
    color: black;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`
const CustomBtn = styled(Button)`
  color: black;
  border-color: black;

  &:hover,
  &:active {
    border: 1px solid black;
  }
`
