import { atom } from 'recoil'

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

export const currentAddr = atom({
  key: 'currentAddr',
  default: {},
})
