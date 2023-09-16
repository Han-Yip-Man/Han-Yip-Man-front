import { useEffect, useRef } from 'react'
import * as S from './Main.styles'
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined'
import { useTheme } from '@mui/material/styles'
import AddrLi from '../../components/address/AddrLi'
import useDebounce from '../../hooks/useDebounce'
import useAddress from '../../hooks/useAddress'
import useRouter from '../../hooks/useRouter'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { focusState, keyword } from '../../atoms/mainAtoms'
import { currentAddr, userAddr } from '../../atoms/addressAtoms'
import searchAddressByKeyword from '../../api/addressSearch'
import useKeyboard from '../../hooks/useKeyboard'
import useAlert from '../../hooks/useAlert'
import { userInfo } from '../../atoms/userInfoAtoms'
import axiosClient from '../../api/axiosInstance'
import axios from 'axios'

const geo = new window.kakao.maps.services.Geocoder()

function Main() {
  const isLoggedIn = useRecoilValue(userInfo)
  const setNonLoginAddrs = useSetRecoilState(currentAddr)
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

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
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

  const onMouseUp = (event: React.MouseEvent) => {
    event.preventDefault()
    if (!isFocused) {
      setIsFocused(true)
    }
  }

  const onClickOutside = (event: MouseEvent) => {
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

  const searchAddressByCoords = (longitude: number, latitude: number) => {
    geo.coord2Address(longitude, latitude, (result: any) => {
      const keyword = result[0]?.road_address
      searchAddressByKeyword(keyword?.address_name, (result: any, status: any) => {
        if (status === 'OK') {
          setInputKeyword(() => result[0]?.place_name)
        }
      })
    })
  }

  const submitAddress = async () => {
    if (!data[0]) {
      handleAlert('주소를 똑바로 입력하세요 👿', 3000, 'error')
      return
    }

    const { id, address_name, road_address_name, place_name, x, y } = data[0]

    const currentAddr = {
      id,
      address: address_name,
      road_address: road_address_name,
      place_name,
      lat: y,
      lng: x,
      isDefault: true,
    }

    if (isLoggedIn) {
      // 로그인 붙인다음 ! 없애야함
      const userAddr = {
        address: address_name,
        addressDetail: place_name,
        latitude: parseFloat(y),
        longitude: parseFloat(x),
      }

      // 1. 주소 id를 가지고 이미 존재하는 주소인지 파악하는 api 필요
      // 2. 1번이 안돼면 로그인 유저는 주소 정보 불러왔을때 등록된 주소가 존재하면 바로 전역 주소 상태 갱신하고 카테고리 메인으로 이동시켜야함
      // 3. 주소가 하나만 남으면 자동으로 default로 설정하게 해야함 서버에 요청
      // 4. 서버에 userAddr 아톰 형식처럼 저장가능한지 물어봐야함

      try {
        const response = await axiosClient.post(
          `/addresses/register?address=${address_name}&addressDetail=${place_name}&latitude=${y}&longitude=${x}`,
          userAddr,
        )
        // console.log(response)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return handleAlert(`${error.response?.data.message}`, 4000, 'error')
        }
      }
    } else {
      setNonLoginAddrs((prev) => [
        ...prev.map((addr) => (addr.isDefault ? { ...addr, isDefault: false } : addr)),
        currentAddr,
      ])
    }

    setAddr(currentAddr)

    handleAlert('맛집을 찾아보세요 !! 😋', 3000, 'success')

    routeTo('/main')
  }

  useEffect(() => {
    if (!isLoggedIn) {
      // 나중에 !isLoggedIn으로 바꿔야 함 테스트 끝나면
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => {
          searchAddressByCoords(longitude, latitude)
        },
        (error) => {
          switch (error.code) {
            case 0:
              return handleAlert('알수없는 에러로 좌표받기 실패', 3000, 'error')
            case 1:
              return handleAlert('권한이 없어 좌표를 받아오지 못했습니다.', 3000, 'error')
            case 2:
              return handleAlert('position unavailable', 3000, 'error')
            case 3:
              return handleAlert('시간 초과', 3000, 'error')
          }
        },
        { enableHighAccuracy: true },
      )
    } else {
      axiosClient.get('/addresses').then((res) => {
        // 전역 상태에
        const { longitude, latitude } = res.data[0]
        searchAddressByCoords(longitude, latitude)
      })
    }

    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [])

  return (
    <S.MainWrap>
      <S.CustomWrap>
        <S.MainTitle>내 주변 최고의 맛집에서 주문하세요</S.MainTitle>
        <S.AddrWrap>
          <S.InputWrap>
            <S.InputIcon />
            <S.AddrInput
              type="text"
              placeholder="주소를 입력하세요"
              value={inputKeyword}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onMouseUp={onMouseUp}
              onKeyDown={handleKeyPress}
              ref={inputRef}
            />
            <S.CustomBtn variant="contained" btncolor={custom} onClick={submitAddress}>
              <MopedOutlinedIcon />
              &nbsp;맛집 찾기
            </S.CustomBtn>
          </S.InputWrap>
          {isFocused && (
            <S.AddrUl ref={ulRef} onMouseDown={onMouseUp}>
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
            </S.AddrUl>
          )}
        </S.AddrWrap>
      </S.CustomWrap>
    </S.MainWrap>
  )
}

export default Main
