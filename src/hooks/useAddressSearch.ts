import { useDaumPostcodePopup } from 'react-daum-postcode'
import { DaumPostcodeData } from '../types/Address'

const useAddressSearch = (scriptUrl: string) => {
  const open = useDaumPostcodePopup(scriptUrl)

  const getAddressCoordinates = async (address: string | undefined) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
          address ? address : '',
        )}`,
        {
          headers: {
            Authorization: 'KakaoAK d1d67d3d0c029ec63bff82955f1f5976',
          },
        },
      )
      const data = await response.json()
      if (data.documents && data.documents.length > 0) {
        return {
          latitude: data.documents[0].y,
          longitude: data.documents[0].x,
        }
      } else {
        throw new Error('No results found')
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const handleComplete = async (data: DaumPostcodeData) => {
    const { address, zonecode } = data
    let fullAddress: string | undefined = address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    const coordinates = await getAddressCoordinates(fullAddress)

    return { address: fullAddress, zonecode, coordinates }
  }

  const openPostcodePopup = (): Promise<{
    address: string | undefined
    zonecode: string | undefined
    coordinates: {
      latitude: string | undefined
      longitude: string | undefined
    } | null
  }> => {
    return new Promise((resolve, reject) => {
      open({
        popupKey: '중복창은안돼요',
        popupTitle: '두근두근 신나는 주소찾기',
        onComplete: async (data) => {
          resolve(await handleComplete(data))
        },

        onError: (error) => {
          reject(error)
        },
      })
    })
  }
  return openPostcodePopup
}

export default useAddressSearch
