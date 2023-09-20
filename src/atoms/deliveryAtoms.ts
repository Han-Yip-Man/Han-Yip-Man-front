import { atom } from 'recoil'

type Location = {
  lat: number
  lng: number
}

export const endPointLocationAtom = atom<Location>({
  key: 'endPoint',
  default: {
    lat: 0,
    lng: 0,
  },
})
