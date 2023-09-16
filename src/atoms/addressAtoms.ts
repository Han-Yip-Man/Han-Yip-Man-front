import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export const { persistAtom } = recoilPersist({
  key: 'currentAddr',
  storage: sessionStorage,
})

export const { persistAtom: curretNonAddr } = recoilPersist({
  key: 'nonLoginAddr',
  storage: sessionStorage,
})

export const userAddr = atom<CurrentAddr>({
  key: 'userAddr',
  default: {
    id: '',
    address: '',
    road_address: '',
    place_name: '',
    lat: '',
    lng: '',
    isDefault: true,
  },
  effects_UNSTABLE: [persistAtom],
})

export const currentAddr = atom<CurrentAddr[]>({
  key: 'non-member-addr',
  default: [],
  effects_UNSTABLE: [curretNonAddr],
})
