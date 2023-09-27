import { useEffect, ReactNode, useCallback } from 'react'
import { useOrderNotice, useSocketContext } from '../hooks'
import { Toaster } from 'react-hot-toast'
import SellerNoti from '../components/order/SellerNoti'
import CustomerNoti from '../components/order/CustomerNoti'
import styled from '@emotion/styled'
import SELLERORDER from '../assets/audio/SELLERORDER.mp3'
import CANCELED from '../assets/audio/CANCEL.mp3'
import DELIVERY from '../assets/audio/DELIVERY.mp3'
import COOKING from '../assets/audio/COOKING.mp3'
import TAKEOVER from '../assets/audio/TAKEOVER.mp3'
import COMPLETE from '../assets/audio/COMPLETE.mp3'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  children: ReactNode
  mode: 'seller' | 'customer'
}

const OrderAlarmProvider = ({ children, mode }: Props) => {
  const { orderIncoming, onClose } = useOrderNotice()
  const { socket } = useSocketContext()
  const qc = useQueryClient()

  // const callNoti = (sound: string, creater: (t: any) => React.ReactElement) => {
  //   orderIncoming(creater, sound)
  // }

  const createSellerNoti = (data: AlarmData, sound: string) => {
    orderIncoming((t) => <SellerNoti t={t} onClose={onClose} data={data} />, sound)
  }

  const createCustomerNoti = (data: AlarmData, sound: string) => {
    orderIncoming((t) => <CustomerNoti t={t} onClose={onClose} data={data} />, sound)
  }

  const customerNotiAlarm = (res: AlarmData) => {
    console.log('주문상태 변경 이벤트', res)
    qc.invalidateQueries(['orders'])
    switch (res.orderStatus) {
      case 'TAKEOVER':
        return createCustomerNoti(res, TAKEOVER)
      case 'COOKING':
        return createCustomerNoti(res, COOKING)
      case 'DELIVERY':
        return createCustomerNoti(res, DELIVERY)
      case 'CANCELED':
        return createCustomerNoti(res, CANCELED)
      case 'COMPLETE':
        return createCustomerNoti(res, COMPLETE)
    }
  }

  const sellerNotiAlarm = (res: AlarmData) => {
    console.log('신규 주문', res)
    if (res.orderStatus === 'PAID') {
      createSellerNoti(res, SELLERORDER)
      qc.invalidateQueries(['orderList'])
    }
  }

  useEffect(() => {
    if (mode === 'customer') {
      socket?.emit('room_enter', 'user19', (res: any) => {
        console.log('고객 방입장', res)
        socket?.on('NoticeOrderBuyer', customerNotiAlarm)
      })
    }

    if (mode === 'seller') {
      socket?.emit('room_enter', 'user13', (res: any) => {
        console.log('사장님 방입장')
        socket.on('NoticeOrderSeller', sellerNotiAlarm)
      })
    }

    return () => {
      socket?.off('NoticeOrderBuyer', customerNotiAlarm)
      socket?.off('NoticeOrderSeller', sellerNotiAlarm)
    }
  }, [socket, mode])

  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{ duration: mode === 'customer' ? 4000 : Infinity }}
      />
    </>
  )
}

export default OrderAlarmProvider

const Btn = styled.button`
  width: 500px;
`
