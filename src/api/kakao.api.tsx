import { useEffect, useState } from 'react'

const { kakao } = window

declare global {
  interface Window {
    kakao: any
  }
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
      level: 5,
    }

    const map = new kakao.maps.Map(mapContainer, mapOption)
    console.log(map)

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
  latitude: number
  longitude: number
}

export const KakaoMap = ({ mapId, width, height, latitude, longitude }: KakaoMapProps) => {
  useEffect(() => {
    const mapContainer = document.getElementById(mapId)

    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 5,
    }

    const map = new kakao.maps.Map(mapContainer, mapOption)
    console.log(map)

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
