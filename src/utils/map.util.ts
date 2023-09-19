/**
 * 두 점 사이에 좌표값을 생성하는 유틸함수
 *
 */
const getTempPointArray = (start: number, end: number) => {
  const curArr = []
  for (let index = 0; index < 11; index++) {
    const current = start + (end - start) * (index / 10)
    curArr.push(current)
  }
  return curArr
}

/**
 * 두 배열로 좌표 배열을 생성하는 유틸함수
 *
 */
const getLatLngArray = (latArray: number[], lngArray: number[]) => {
  const result = []
  for (let index = 0; index < 11; index++) {
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
