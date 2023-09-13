import { atom } from 'recoil'

export const keyword = atom({
  key: 'keyword',
  default: '',
})

export const focusState = atom({
  key: 'isFocus',
  default: false,
})

export const dataState = atom<DataType[]>({
  key: 'addr_data',
  default: [],
})
