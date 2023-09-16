import styled from '@emotion/styled'
import { Typography, TextField, Autocomplete, Button, List } from '@mui/material'

import AddressListItem from './AddressListItem'
// import axiosClient from '../../api/axios'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfo } from '../../atoms/userInfoAtoms'
import { useEffect, useState } from 'react'
import searchAddressByKeyword from '../../api/addressSearch'
import useDebounce from '../../hooks/useDebounce'
import { currentAddr } from '../../atoms/addressAtoms'
import useAlert from '../../hooks/useAlert'

// const getUserAddr = async () => {
//   const response = await axiosClient.get('/addresses')
//   return response.data
// }

// const regUserAddrPost = async (url: string) => {
//   const response = await axiosClient.post(url)
//   return response
// }

function AddressModal() {
  const isLoggedIn = useRecoilValue(userInfo)
  const [nonAddrList, setNonAddrList] = useRecoilState(currentAddr)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const { debouncedKeyword, isLoading: addrLoading } = useDebounce(searchKeyword, 600)
  const [addrData, setAddrData] = useState([])
  const [selectedAddr, setSelectedAddr] = useState<CurrentAddr>()
  const handleAlert = useAlert()
  // const qc = useQueryClient()
  // const mutation = useMutation(() => regUserAddrPost('/addresses/register'))
  // const { data, isLoading } = useQuery(['modalAddr'], getUserAddr, { enabled: !!isLoggedIn })

  // 로그인시 리액트쿼리로 데이터 비로그인시 리코일 상태로
  const handleChange = (_: React.SyntheticEvent<any>, keyword: string) => {
    if (!keyword) return
    setSearchKeyword(keyword)
  }

  const handleSubmit = () => {
    if (isLoggedIn) {
      // 유저 주소에 등록해야함
      // mutation 사용해서 selectedAddr 을 등록 하고 mutation으로 쿼리 초기화 해서 새 데이터
    } else {
      if (!selectedAddr) return
      const filterAddr = nonAddrList.filter((addr) => addr.id === selectedAddr.id)
      if (filterAddr.length > 0) {
        handleAlert('이미 존재하는 주소 입니다.', 3000, 'warning')
        return
      }
      setSearchKeyword('')
      setNonAddrList((prev) => [...prev, selectedAddr] as CurrentAddr[])
      handleAlert('주소를 등록했습니다.', 3000, 'success')
    }
  }

  useEffect(() => {
    if (!debouncedKeyword) return
    searchAddressByKeyword(debouncedKeyword, (result: any) => {
      setAddrData(() => result)
    })
  }, [debouncedKeyword])

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
        {isLoggedIn
          ? ''
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
