import { atom } from 'recoil'

export const accordionExpand = atom<string | false>({
  key: 'expandable',
  default: '',
})
