import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import PlaceIcon from '@mui/icons-material/Place'
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import AddrLi from '../components/address/AddrLi'
import useDebounce from '../hooks/useDebounce'
import useAddress from '../hooks/useAddress'
import useRouter from '../hooks/useRouter'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { focusState, keyword } from '../atoms/mainAtoms'
import { userAddr } from '../atoms/addressAtoms'
import searchAddressByKeyword from '../api/addressSearch'
import useKeyboard from '../hooks/useKeyboard'
import useAlert from '../hooks/useAlert'

const geo = new window.kakao.maps.services.Geocoder()

function Main() {
  // TODO: 메인페이지 접속시에 회원이면 토큰 좌표를 가져와서 주소로 변환해서 인풋에 넣기
  // 주소를 입력하면 전역상태로 관리하자 주소가 없으면 메인페이지로 돌려보내기
  const [isFocused, setIsFocused] = useRecoilState(focusState)
  const [inputKeyword, setInputKeyword] = useRecoilState(keyword)
  const setAddr = useSetRecoilState(userAddr)
  const { debouncedKeyword } = useDebounce(inputKeyword, 600)
  const { data, setData, msg } = useAddress(debouncedKeyword)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { currentIndex, ulRef, handleKeyPress, setCurrentIndex } = useKeyboard(data.length, () => {
    setInputKeyword(() => data[currentIndex].place_name)
    setData(() => [data[currentIndex]])
    setIsFocused(false)
  })
  const { routeTo } = useRouter()
  const handleAlert = useAlert()

  const {
    palette: { custom },
  } = useTheme()

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(() => target.value)
    if (!isFocused) {
      setIsFocused(() => true)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isFocused) {
      setIsFocused(true)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ulRef.current &&
      !ulRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false)
    }
  }

  const resetCurrentIndex = () => {
    setCurrentIndex(() => -1)
  }

  const submitAddress = () => {
    if (!data[0]) {
      handleAlert('주소를 똑바로 입력하세요 👿', 3000, 'error')
      return
    }
    const { id, address_name, road_address_name, place_name, place_url, x, y } = data[0]

    setAddr({
      id,
      address: address_name,
      road_address: road_address_name,
      place_name,
      place_url,
      lat: y,
      lng: x,
    })
    handleAlert('맛집을 찾아보세요 !! 😋', 3000, 'success')

    routeTo('/main')
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log('lat', latitude, 'lng', longitude)
        geo.coord2Address(longitude, latitude, (result: any) => {
          const keyword = result[0].road_address
          searchAddressByKeyword(keyword.address_name, (result: any, status: any) => {
            if (status === 'OK') {
              setInputKeyword(() => result[0].place_name)
            }
          })
        })
      },
      (error) => {
        console.log('좌표 받아오기 오류 =>', error.code)
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      },
      { enableHighAccuracy: true },
    )
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <MainWrap>
      <CustomWrap>
        <MainTitle>내 주변 최고의 맛집에서 주문하세요</MainTitle>
        <AddrWrap>
          <InputWrap>
            <InputIcon />
            <AddrInput
              type="text"
              placeholder="주소를 입력하세요"
              value={inputKeyword}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onMouseUp={handleMouseUp}
              onKeyDown={handleKeyPress}
              ref={inputRef}
            />
            <CustomBtn variant="contained" btncolor={custom} onClick={submitAddress}>
              <MopedOutlinedIcon />
              &nbsp;맛집 찾기
            </CustomBtn>
          </InputWrap>
          {isFocused && (
            <AddrUl ref={ulRef} onMouseDown={handleMouseUp}>
              {msg.length > 0 ? (
                <AddrLi msg={msg} />
              ) : (
                data.map((addr, index) => (
                  <AddrLi
                    key={addr.id}
                    data={addr}
                    msg={msg}
                    active={index === currentIndex}
                    resetCurrentIndex={resetCurrentIndex}
                  />
                ))
              )}
            </AddrUl>
          )}
        </AddrWrap>
      </CustomWrap>
    </MainWrap>
  )
}

export default Main

const MainWrap = styled.div`
  display: grid;
  grid-template-rows: 200px 1fr;
  height: 100%;
  padding-top: 100px;
`

const MainTitle = styled.h1`
  color: white;
  font-size: 40px;
  display: grid;
  place-items: center;
  margin-bottom: 50px;
`

const CustomWrap = styled(Container)`
  display: grid;
  justify-content: center;
  margin-top: 150px;
`

const AddrWrap = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr;
`

const InputWrap = styled.div`
  display: flex;
  position: relative;
`

const AddrUl = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  overflow: scroll;
  border-radius: 15px;
  margin-top: 20px;
  width: 100%;
  background-color: white;
  padding: 15px 15px 15px 15px;
  gap: 5px;
  max-height: 500px;
`

const InputIcon = styled(PlaceIcon)`
  position: absolute;
  top: 18px;
  left: 20px;
`

const AddrInput = styled.input`
  width: 100%;
  height: 60px;
  outline: none;
  border-radius: 20px;
  border: none;
  padding-left: 55px;
  /* cursor: pointer; */
  font-size: 20px;
  line-height: 60px;
  font-family: inherit;

  &::placeholder {
    font-size: 17px;
    font-weight: bold;
    font-family: inherit;
  }
`

const CustomBtn = styled(Button)<BtnThemeProps>`
  font-size: 17px;
  font-weight: bold;
  font-family: inherit;
  background-color: ${({ btncolor }) => btncolor.secondary};
  margin-left: 10px;
  height: 60px;
  white-space: nowrap;
  border-radius: 15px;
  padding: 30px;

  &:hover {
    background-color: ${({ btncolor }) => btncolor.main};
  }
`
