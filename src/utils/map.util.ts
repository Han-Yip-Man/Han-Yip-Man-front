import kakaoApi from '../api/kakao.api'

const TOTAL = 11
const DIVIDER = TOTAL - 1

/**
 * 두 점 사이에 좌표값을 생성하는 유틸함수
 *
 */
const getTempPointArray = (start: number, end: number) => {
  const curArr = []
  for (let index = 0; index < TOTAL; index++) {
    const current = start + (end - start) * (index / DIVIDER)
    curArr.unshift(current)
  }
  return curArr
}

/**
 * 두 배열로 좌표 배열을 생성하는 유틸함수
 *
 */
const getLatLngArray = (latArray: number[], lngArray: number[]) => {
  const result = []
  for (let index = 0; index < TOTAL; index++) {
    result.push({ lat: latArray[index], lng: lngArray[index] })
  }
  return result
}

/**
 * 두 좌표 사이에 좌표값을 생성하는 유틸함수
 *
 */
export const getTempCurrentLatLng = (
  startPoint: { lat: number; lng: number },
  endPoint: { lat: number; lng: number },
) => {
  const latArr = getTempPointArray(startPoint.lat, endPoint.lat) // lat 중간값의 배열
  const lngArr = getTempPointArray(startPoint.lng, endPoint.lng) // lng 중간값의 배열

  const result = getLatLngArray(latArr, lngArr)
  return result
}

/**
 * 주소 값을 좌표값으로 변환하는 함수
 * setAtom 사용
 *
 * @param address
 * @param setEndPoint
 * @returns
 */
export const getAddressToLatLng = (address: string | undefined, setAtom: any) => {
  if (address === undefined) return console.log('address is undefined')
  console.log(address)
  const geocoder = new kakaoApi.kakao.maps.services.Geocoder()

  const callback = (result: any, status: any) => {
    if (status === kakaoApi.kakao.maps.services.Status.OK) {
      setAtom(() => ({
        lat: +parseFloat(result[0].y).toFixed(6),
        lng: +parseFloat(result[0].x).toFixed(6),
      }))
    }
  }
  geocoder.addressSearch(address, callback)
}
