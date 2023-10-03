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

  startPointLat: number
  startPointLng: number
  curPointLat: number
  curPointLng: number
  endPointLat: number
  endPointLng: number
}

export const DeliveryKakaoMap = ({
  mapId,
  width,
  height,
  startPointLat,
  startPointLng,
  curPointLat,
  curPointLng,
  endPointLat,
  endPointLng,
}: DeliveryKakaoMapProps) => {
  // console.log('kakao start', startPointLat, startPointLng)
  // console.log('kakao cur', curPointLat, curPointLng)
  // console.log('kakao end', endPointLat, endPointLng)

  useEffect(() => {
    const mapContainer = document.getElementById(mapId), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(
          (startPointLat + endPointLat) / 2,
          (startPointLng + endPointLng) / 2,
        ), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      }

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption)

    /**
     * 출발지, 도착지
     */
    const positions = [
      {
        title: '출발지',
        latlng: new kakao.maps.LatLng(startPointLat, startPointLng),
        imageSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png',
      },
      {
        title: '도착지',
        latlng: new kakao.maps.LatLng(endPointLat, endPointLng),
        imageSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png',
      },
      {
        title: '드론',
        latlng: new kakao.maps.LatLng(curPointLat, curPointLng),
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
    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
    const linePath = [
      new kakao.maps.LatLng(startPointLat, startPointLng),
      new kakao.maps.LatLng(curPointLat, curPointLng),
      new kakao.maps.LatLng(endPointLat, endPointLng),
    ]

    // 지도에 표시할 선을 생성합니다
    const polyline1 = new kakao.maps.Polyline({
      path: [linePath[0], linePath[1]],
      strokeWeight: 5,
      strokeColor: '#0040ff',
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
    })
    const polyline2 = new kakao.maps.Polyline({
      path: [linePath[1], linePath[2]],
      strokeWeight: 5,
      strokeColor: '#0040ff',
      strokeOpacity: 0.7,
      strokeStyle: 'dashed',
    })

    // 지도에 선을 표시합니다
    polyline1.setMap(map)
    polyline2.setMap(map)
  }, [curPointLat, curPointLng])

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
