import { useEffect } from 'react'
import { useSSEContext } from '../../hooks'

const OrderAlarm = () => {
  const sse = useSSEContext()

  useEffect(() => {
    sse?.addEventListener('NoticeOrder', (response) => {
      const data = JSON.parse(response.data)
    })
  }, [])
}

export default OrderAlarm
