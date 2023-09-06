import { useDaumPostcodePopup } from 'react-daum-postcode'
import { DaumPostcodeData } from '../types/Address'

const useAddressSearch = (scriptUrl: string) => {
  const open = useDaumPostcodePopup(scriptUrl)

  const handleComplete = (data: DaumPostcodeData) => {
    const { address, zonecode } = data
    let fullAddress = address
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

    return { address: fullAddress, zonecode } // 여기서 주소 데이터와 zonecode를 객체 형태로 반환합니다.
  }

  const openPostcodePopup = (): Promise<{
    address: string | undefined
    zonecode: string | undefined
  }> => {
    return new Promise((resolve, reject) => {
      open({
        onComplete: (data) => {
          resolve(handleComplete(data))
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
