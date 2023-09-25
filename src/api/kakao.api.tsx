import { useEffect, useRef, useState, SyntheticEvent } from 'react'
import { endPointLocationAtom } from '../atoms/deliveryAtoms'
import { getAddressToLatLng } from '../utils/map.util'
import { useRecoilState } from 'recoil'

const { kakao } = window

declare global {
  interface Window {
    kakao: any
  }
}

type DeliveryKakaoMapProps = {
  mapId: string
  width: string
  height: string
  latitude: number
  longitude: number
  curLatitude: number
  curLongitude: number
  addressData: string
  endPointLatitude: number
  endPointLongitude: number
}

export const DeliveryKakaoMap = ({
  mapId,
  width,
  height,
  latitude,
  longitude,
  curLatitude,
  curLongitude,
  addressData,
  endPointLatitude,
  endPointLongitude,
}: DeliveryKakaoMapProps) => {
  const [endPoint, setEndPoint] = useRecoilState(endPointLocationAtom)

  console.log('from>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('latlng', latitude, longitude)
  console.log('curlatlng', curLatitude, curLongitude)
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>to')

  getAddressToLatLng(addressData, setEndPoint)
  // orderData 불러올 때 좌표가 아니고 주소지가 옵니다
  // 그래서 이 함수 안에서 콜백함수가 실행되어서 값이 없나봐요
  // 간과했습니다 ㅠㅠ
  // 시작점 끝점만 있으면 움직이는 거는 아마 가능할 듯 합니다
  // 그렇죠 끝점이 주소지입니다

  useEffect(() => {
    /**
     * map
     */

    const mapContainer = document.getElementById(mapId)

    const mapOption = {
      // center: new kakao.maps.LatLng((latitude + endPointLatitude) / 2, (longitude + endPointLongitude) / 2),
      // center: new kakao.maps.LatLng((latitude + endPoint.lat) / 2, (longitude + endPoint.lng) / 2),
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 5,
    }

    const startingPoint = {
      latitude,
      longitude,
      // latitude: 37.492569,
      // longitude: 127.026444,
    }
    const endingPoint = {
      latitude: endPointLatitude,
      longitude: endPointLongitude,
      // latitude: endPoint.lat,
      // longitude: endPoint.lng,
      // latitude: 37.488569,
      // longitude: 127.037444,
    }

    const map = new kakao.maps.Map(mapContainer, mapOption)
    // console.log(map)

    /**
     * marker
     */
    const markerPosition = new kakao.maps.LatLng(curLatitude, curLongitude)

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    })

    marker.setMap(map)

    /**
     * 출발지, 도착지
     */
    const positions = [
      {
        title: '출발지',
        latlng: new kakao.maps.LatLng(startingPoint.latitude, startingPoint.longitude),
        imageSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png',
      },
      {
        title: '도착지',
        latlng: new kakao.maps.LatLng(endingPoint.latitude, endingPoint.longitude),
        imageSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png',
      },
      {
        title: '드론',
        latlng: new kakao.maps.LatLng(curLatitude, curLongitude),
        imageSrc: '/svg/drone.svg',
      },
    ]

    for (let i = 0; i < positions.length; i++) {
      const imageSize = new kakao.maps.Size(50, 45)

      const marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].title,
        image: new kakao.maps.MarkerImage(positions[i].imageSrc, imageSize),
      })
      marker.setMap(map)
    }

    /**
     * line
     */
    // // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
    // const linePath = [
    //   new kakao.maps.LatLng(startingPoint.latitude, startingPoint.longitude),
    //   new kakao.maps.LatLng(curLatitude, curLongitude),
    //   new kakao.maps.LatLng(endingPoint.latitude, endingPoint.longitude),
    // ]

    // // 지도에 표시할 선을 생성합니다
    // const polyline1 = new kakao.maps.Polyline({
    //   path: [linePath[0], linePath[1]],
    //   strokeWeight: 5,
    //   strokeColor: '#0040ff',
    //   strokeOpacity: 0.7,
    //   strokeStyle: 'solid',
    // })
    // const polyline2 = new kakao.maps.Polyline({
    //   path: [linePath[1], linePath[2]],
    //   strokeWeight: 5,
    //   strokeColor: '#0040ff',
    //   strokeOpacity: 0.7,
    //   strokeStyle: 'dashed',
    // })

    // // 지도에 선을 표시합니다
    // polyline1.setMap(map)
    // polyline2.setMap(map)

    /**
     * info window
     */
    // if (latitude !== undefined && longitude !== undefined) {
    const isDelivered =
      curLatitude === endingPoint.latitude && curLongitude === endingPoint.longitude

    //   let iwContent
    //   if (isDelivered) {
    //     iwContent = '<div style="padding:5px;">배달 완료!!</div>'
    //   } else {
    //     iwContent = '<div style="padding:5px;">배달 중...</div>' // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    //   }
    //   const iwPosition = new kakao.maps.LatLng(curLatitude + 0.012, curLongitude), //인포윈도우 표시 위치입니다
    //     iwRemoveable = false // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    //   // 인포윈도우를 생성하고 지도에 표시합니다
    //   const infowindow = new kakao.maps.InfoWindow({
    //     map: map, // 인포윈도우가 표시될 지도
    //     position: iwPosition,
    //     content: iwContent,
    //     removable: iwRemoveable,
    //   })

    if (isDelivered) {
      //   setTimeout(() => {
      //     // infowindow.close()
      //     // polyline1.setMap(null)
      //     // polyline2.setMap(null)
      //   }, 1000)
      console.log('don')
    }
    // }
  }, [curLatitude, curLongitude])

  return (
    <>
      <div id={mapId} style={{ margin: 10, width: width, height: height }}></div>
    </>
  )
}

type UserSetAddressKakaoMapProps = {
  mapId: string
  width: string
  height: string
  latitude: number
  longitude: number
}

export const UserSetAddressKakaoMap = ({
  mapId,
  width,
  height,
  latitude,
  longitude,
}: UserSetAddressKakaoMapProps) => {
  const [centerLatitude, setCenterLatitude] = useState(latitude)
  const [centerLongitude, setCenterLongitude] = useState(longitude)
  // const [markers, setMarkers] = useState([])

  // console.log(latitude, longitude)

  const [address, setAddress] = useState('')
  useEffect(() => {
    const mapContainer = document.getElementById(mapId)

    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    }

    const map = new kakao.maps.Map(mapContainer, mapOption)
    // console.log(map)

    const markerPosition = new kakao.maps.LatLng(latitude, longitude)

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    })

    // setMarkers([...markers, marker])

    marker.setMap(map)
    const geocoder = new kakao.maps.services.Geocoder()

    kakao.maps.event.addListener(map, 'dragend', () => {
      const latlng = map.getCenter()
      setCenterLatitude(latlng.Ma)
      setCenterLongitude(latlng.La)

      const markerPosition = new kakao.maps.LatLng(latlng.Ma, latlng.La)

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      })

      marker.setMap(map)

      const callback = function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          if (result[0].address.address_name === undefined) return
          console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가')
          setAddress(result[0].address.address_name)
        }
      }
      const coord = new kakao.maps.LatLng(latlng.Ma, latlng.La)
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback)
    })
  }, [latitude, longitude])

  return (
    <>
      <div id={mapId} style={{ margin: 10, width: width, height: height }}></div>
      <p>지도 이동 시 중심좌표</p>
      <p id="lat">위도 : {centerLatitude}</p>
      <p id="lng">경도 : {centerLongitude}</p>
      <p>지도 이동 시 주소 : {address}</p>
    </>
  )
}

type KakaoMapProps = {
  mapId: string
  width: string
  height: string
  latitude: number | undefined
  longitude: number | undefined
}

export const KakaoMap = ({ mapId, width, height, latitude, longitude }: KakaoMapProps) => {
  useEffect(() => {
    const mapContainer = document.getElementById(mapId)

    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    }

    const map = new kakao.maps.Map(mapContainer, mapOption)
    // console.log(map)

    const markerPosition = new kakao.maps.LatLng(latitude, longitude)

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    })

    marker.setMap(map)

    const setDraggable = (draggable: boolean) => {
      map.setDraggable(draggable)
    }
    setDraggable(false)

    const setZoomable = (zoomable: boolean) => {
      map.setZoomable(zoomable)
    }
    setZoomable(false)
  }, [])

  return (
    <>
      <div id={mapId} style={{ width: width, height: height }}></div>
    </>
  )
}

export default { kakao }
