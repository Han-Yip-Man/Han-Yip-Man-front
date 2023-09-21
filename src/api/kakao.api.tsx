import { useEffect, useRef, useState } from 'react'
import { endPointLocationAtom } from '../atoms/deliveryAtoms'

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
  endingPointLatitude: number
  endingPointLongitude: number
}

export const DeliveryKakaoMap = ({
  mapId,
  width,
  height,
  latitude,
  longitude,
  curLatitude,
  curLongitude,
  endingPointLatitude,
  endingPointLongitude,
}: DeliveryKakaoMapProps) => {
  const mapContainer = useRef(null)

  const mapOption = {
    center: new kakao.maps.LatLng(
      (latitude + endingPointLatitude) / 2,
      (longitude + endingPointLongitude) / 2,
    ),
    level: 8,
  }

  const startingPoint = {
    latitude,
    longitude,
    // latitude: 37.492569,
    // longitude: 127.026444,
  }
  const endingPoint = {
    latitude: endingPointLatitude,
    longitude: endingPointLongitude,
    // latitude: 37.488569,
    // longitude: 127.037444,
  }

  useEffect(() => {
    /**
     * map
     */
    const map = new kakao.maps.Map(mapContainer.current, mapOption)
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
      new kakao.maps.LatLng(startingPoint.latitude, startingPoint.longitude),
      new kakao.maps.LatLng(curLatitude, curLongitude),
      new kakao.maps.LatLng(endingPoint.latitude, endingPoint.longitude),
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

    /**
     * info window
     */
    if (latitude !== undefined && longitude !== undefined) {
      const iwContent = '<div style="padding:5px;">배달 중...</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(curLatitude + 0.003, curLongitude), //인포윈도우 표시 위치입니다
        iwRemoveable = false // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      // 인포윈도우를 생성하고 지도에 표시합니다
      const infowindow = new kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      })

      const isDelivered =
        curLatitude === endingPoint.latitude && curLongitude === endingPoint.longitude

      if (isDelivered) {
        infowindow.close()
      }
    }
  }, [curLatitude, curLongitude])

  return (
    <>
      <div id={mapId} ref={mapContainer} style={{ margin: 10, width: width, height: height }}></div>
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
      console.log(latlng)
      setCenterLatitude(latlng.Ma)
      setCenterLongitude(latlng.La)

      const markerPosition = new kakao.maps.LatLng(latlng.Ma, latlng.La)

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      })

      marker.setMap(map)

      const callback = function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가')
          setAddress(result[0].address.address_name)
        }
      }
      const coord = new kakao.maps.LatLng(latlng.Ma, latlng.La)
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback)
    })
  }, [])

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
