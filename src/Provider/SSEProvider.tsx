import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { tokenState } from '../atoms/userInfoAtoms'
import { MapCoordsState, CustomerAlarm, SellerAlarm } from '../atoms/orderManageAtoms'

export const SSEContext = createContext<EventSource | null>(null)

interface Props {
  children: ReactNode
  url: string
}

interface SSEResponse {
  userId: number
  eventName: SSEType
  sendCount: number
  data: string
}

type Coords = {
  latitude: number
  longitude: number
}

type SSEType = 'NoticeOrderBuyer' | 'NoticeOrderSeller' | 'NoticeDronLocation'

export const SSEProvider = ({ children, url }: Props) => {
  const [sse, setSSE] = useState<EventSource | null>(null)
  const setCoords = useSetRecoilState(MapCoordsState)
  const setCustomerAlarm = useSetRecoilState(CustomerAlarm)
  const setSellerAlarm = useSetRecoilState(SellerAlarm)
  // const token = useRecoilValue(tokenState)

  const eventHandler = async (response: any) => {
    const sseResponse: SSEResponse = await response.data
    switch (sseResponse.eventName) {
      case 'NoticeOrderBuyer': {
        const parsedData: AlarmData = JSON.parse(sseResponse.data)
        return setCustomerAlarm(parsedData)
      }
      case 'NoticeOrderSeller': {
        const parsedData: AlarmData = JSON.parse(sseResponse.data)
        return setSellerAlarm(parsedData)
      }
      case 'NoticeDronLocation': {
        const parsedData: Coords = JSON.parse(sseResponse.data)
        return setCoords(parsedData)
      }
    }
  }

  useEffect(() => {
    if (sse) {
      sse.close()
    }

    const eventSource = new EventSource(`${url}`)
    setSSE(eventSource)

    eventSource.onopen = () => {
      console.log('SSE 연결')
    }

    eventSource.onerror = (e) => {
      console.log(e)
    }

    eventSource.onmessage = eventHandler

    return () => {
      eventSource.close()
    }
  }, [url])

  return <SSEContext.Provider value={sse}>{children}</SSEContext.Provider>
}
