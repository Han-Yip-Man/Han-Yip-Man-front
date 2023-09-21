import { atom } from 'recoil'

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
    menuNames: '',
    orderId: 0,
    orderUId: '',
    orderedTime: '',
    orderStatus: '',
    paymentProvider: '',
    totalAmount: 0,
  },
})

export const SellerAlarm = atom<AlarmData>({
  key: 'sellerAlarm',
  default: {
    address: '',
    menuNames: '',
    orderId: 0,
    orderUId: '',
    orderedTime: '',
    orderStatus: '',
    paymentProvider: '',
    totalAmount: 0,
  },
})
