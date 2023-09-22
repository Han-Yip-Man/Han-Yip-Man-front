import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export const accordionExpand = atom<string | false>({
  key: 'expandable',
  default: '',
})

export const MapCoordsState = atom({
  key: 'alarm',
  default: {
    latitude: 0,
    longitude: 0,
  },
})

export const CustomerAlarm = atom<AlarmData>({
  key: 'customerAlarm',
  default: {
    address: '',
    addressDetail: '',
    menuNames: '',
    orderId: 0,
    orderUId: '',
    orderedTime: '',
    orderStatus: 'PAID',
    paymentProvider: '',
    totalAmount: 0,
  },
})

export const SellerAlarm = atom<AlarmData>({
  key: 'sellerAlarm',
  default: {
    address: '',
    addressDetail: '',
    menuNames: '',
    orderId: 0,
    orderUId: '',
    orderedTime: '',
    orderStatus: 'PAID',
    paymentProvider: '',
    totalAmount: 0,
  },
})

export const { persistAtom } = recoilPersist({
  key: 'session',
  storage: sessionStorage,
})
