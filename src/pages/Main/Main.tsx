import * as S from './Main.styles'
import { useEffect, useRef } from 'react'
import { isAxiosError } from 'axios'
import searchAddressByKeyword from '../../api/addressSearch'
import { checkExistAddress, getAddressData, registerUserAddress } from '../../api/main'
import { useMutation, useQuery } from '@tanstack/react-query'
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined'
import { useTheme } from '@mui/material/styles'
import AddrLi from './components/AddrLi'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { keyword } from '../../atoms/mainAtoms'
import { userInfo } from '../../atoms/userInfoAtoms'
import { currentAddr, userAddr } from '../../atoms/addressAtoms'
import {
  useDebounce,
  useAddress,
  useRouter,
  useKeyboard,
  useAlert,
  useFocus,
} from '../common/hooks'

const geo = new window.kakao.maps.services.Geocoder()

function Main() {
  const {
    palette: { custom },
  } = useTheme()
  const toast = useAlert()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isLoggedIn = useRecoilValue(userInfo)
  const setAddr = useSetRecoilState(userAddr)
  const setNonLoginAddrs = useSetRecoilState(currentAddr)
  const [inputKeyword, setInputKeyword] = useRecoilState(keyword)
  const { debouncedKeyword } = useDebounce(inputKeyword, 600)
  const { data, setData, msg } = useAddress(debouncedKeyword)
  const { isFocused, setIsFocused, onBlur, onFocus } = useFocus()
  const { currentIndex, ulRef, handleKeyPress, setCurrentIndex } = useKeyboard(data.length, () => {
    setInputKeyword(() => data[currentIndex].place_name)
    setData(() => [data[currentIndex]])
    setIsFocused(false)
  })
  const { routeTo } = useRouter()

  const { data: addressData, isSuccess } = useQuery(['address'], getAddressData, {
    enabled: !!isLoggedIn,
  })

  const addrRegisterMutation = useMutation(registerUserAddress)

  const handleMouseUp = (event: React.MouseEvent) => {
    event.preventDefault()
    if (!isFocused) {
      setIsFocused(true)
    }
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(() => target.value)
    if (!isFocused) {
      setIsFocused(() => true)
    }
  }

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (
      ulRef.current &&
      !ulRef.current.contains(target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(target as Node)
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

  const successSubmit = (currentAddr: CurrentAddr) => {
    setAddr(currentAddr)
    toast('맛집을 찾아보세요 !! 😋', 3000, 'success')
    routeTo('/main')
  }

  const submitAddress = () => {
    if (!data[0]) {
      toast('주소를 똑바로 입력하세요 👿', 3000, 'error')
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
      // 주소 중복여부 체크하는 api 요청후 로직 작성
      checkExistAddress(id)
        .then((res) => {
          if (res.data === false) {
            addrRegisterMutation.mutate({ id, address_name, road_address_name, place_name, x, y })
          }
        })
        .catch((error) => {
          if (isAxiosError(error)) {
            return toast(`${error.message}`, 3000, 'error')
          }
        })
    } else {
      setNonLoginAddrs((prev) => {
        const isDuplicate = prev.map((a) => a.id).includes(id)

        const prevAddr = prev.map((addr) => (addr.isDefault ? { ...addr, isDefault: false } : addr))

        if (isDuplicate) {
          return prevAddr.map((addr) => (addr.id === id ? { ...addr, isDefault: true } : addr))
        }

        return [...prevAddr, currentAddr]
      })
    }
    successSubmit(currentAddr)
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (isSuccess && addressData.data) {
        const userAddressData = addressData.data.filter((addr: CurrentAddr) => addr.isDefault)
        userAddressData.length &&
          searchAddressByCoords(userAddressData.longitude, userAddressData.latitude)
      }
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => {
          searchAddressByCoords(longitude, latitude)
        },
        (error) => {
          switch (error.code) {
            case 0:
              return toast('알수없는 에러로 좌표받기 실패', 3000, 'error')
            case 1:
              return toast('권한이 없어 좌표를 받아오지 못했습니다.', 3000, 'error')
            case 2:
              return toast('위치를 알 수 없습니다.', 3000, 'error')
            case 3:
              return toast('시간 초과', 3000, 'error')
          }
        },
        { enableHighAccuracy: true },
      )
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSuccess, addressData])

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
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onMouseUp={handleMouseUp}
              onKeyDown={handleKeyPress}
              ref={inputRef}
            />
            <S.CustomBtn variant="contained" btncolor={custom} onClick={submitAddress}>
              <MopedOutlinedIcon />
              &nbsp;맛집 찾기
            </S.CustomBtn>
          </S.InputWrap>
          {isFocused && (
            <S.AddrUl ref={ulRef} onMouseDown={handleMouseUp}>
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
