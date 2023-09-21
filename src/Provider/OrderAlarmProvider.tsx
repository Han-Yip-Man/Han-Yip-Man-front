import { useEffect, ReactNode, useCallback } from 'react'
import { useOrderNotice } from '../hooks'
import { Toaster } from 'react-hot-toast'
import SellerNoti from '../components/order/SellerNoti'
import CustomerNoti from '../components/order/CustomerNoti'
import styled from '@emotion/styled'
import sound from '../assets/audio/hanyipSound.mp3'
import { useRecoilValue } from 'recoil'
import { CustomerAlarm, SellerAlarm } from '../atoms/orderManageAtoms'

interface Props {
  children: ReactNode
  mode: 'seller' | 'customer'
}

const OrderAlarmProvider = ({ children, mode }: Props) => {
  const { orderIncoming, onClose } = useOrderNotice()
  const customerAlarmData = useRecoilValue(CustomerAlarm)
  const sellerAlarmData = useRecoilValue(SellerAlarm)

  const toastElement = useCallback((component: React.ReactElement) => {
    return <CardWrap>{component}</CardWrap>
  }, [])

  const createSellerNoti = (data: AlarmData) => {
    orderIncoming((t) => toastElement(<SellerNoti t={t} onClose={onClose} data={data} />), sound)
  }

  const createCustomerNoti = (data: AlarmData) => {
    orderIncoming((t) => toastElement(<CustomerNoti t={t} onClose={onClose} data={data} />), sound)
  }

  useEffect(() => {
    if (customerAlarmData.orderId) {
      createCustomerNoti(customerAlarmData)
    }
  }, [customerAlarmData])

  useEffect(() => {
    if (sellerAlarmData.orderId) {
      createSellerNoti(sellerAlarmData)
    }
  }, [sellerAlarmData])

  return (
    <>
      {children}
      <Btn
        onClick={
          mode === 'customer'
            ? () => createCustomerNoti(customerAlarmData)
            : () => createSellerNoti(sellerAlarmData)
        }
      >
        asdasddsada
      </Btn>
      <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ duration: Infinity }} />
    </>
  )
}

export default OrderAlarmProvider

const CardWrap = styled.div`
  height: 200px;
  width: 400px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: rgb(255, 165, 0, 0.9);
  padding: 10px;
`

const Btn = styled.button`
  width: 500px;
`
