import { atom } from 'recoil'

export const keyword = atom({
  key: 'keyword',
  default: '',
})

export const userAddr = atom({
  key: 'userAddr',
  default: {
    id: '',
    address: '',
    road_address: '',
    place_name: '',
    place_url: '',
    lat: '',
    lng: '',
  },
})

export const focusState = atom({
  key: 'isFocus',
  default: false,
})

export const dataState = atom<DataType[]>({
  key: 'addr_data',
  default: [],
})
