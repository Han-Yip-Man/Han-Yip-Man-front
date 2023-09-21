import { atom } from 'recoil'

export const accordionExpand = atom<string | false>({
  key: 'expandable',
  default: '',
})

//오더 아이디
export const OrderIdatom = atom({
  key: 'expandable',
  default: 0,
})

//사전검증 정보받기
export const prepareatom = atom({
  key: 'expandable',
  default: {},
})
