declare interface DataType {
  address_name: string
  category_group_code: string
  category_group_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

declare interface BtnThemeProps {
  btncolor: {
    main: string
    secondary: string
  }
}

declare interface CurrentAddr {
  id: string
  address: string
  road_address: string
  place_name: string
  lat: string
  lng: string
  isDefault: boolean
}

declare interface UserAddr {
  address: string
  addressDetail: string
  addressId: number
  isDefault: boolean
  latitude: number
  longitude: number
  mapId: string
  roadAddress: string
}
