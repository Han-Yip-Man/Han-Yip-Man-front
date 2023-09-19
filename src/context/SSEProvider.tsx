import { createContext, ReactNode, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { tokenState } from '../atoms/userInfoAtoms'
import { EventSourcePolyfill } from 'event-source-polyfill'

export const SSEContext = createContext<EventSource | null>(null)

const EventSource = EventSourcePolyfill

export const SSEProvider = ({ children }: { children: ReactNode }) => {
  const [sse, setSse] = useState<EventSource | null>(null)
  // const token = useRecoilValue(tokenState)
  const token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2R3MjEzMkBhc2R3LmFjIiwidXNlcklkeCI6MTgsImVtYWlsIjoiYXNkdzIxMzJAYXNkdy5hYyIsInJvbGUiOiJTRUxMRVIiLCJpYXQiOjE2OTUxMDk0MDksImV4cCI6MTY5NTI4MjIwOX0.OqJviWIIrxf1tl4eHTpbdU6GjMJs3YvB-CJjperNJHs'

  useEffect(() => {
    const newSSE = new EventSource('http://39.115.156.83:8080/api/sse', {
      headers: {
        Authorization: token,
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    setSse(newSSE)

    newSSE.onopen = () => {
      console.log('SSE 연결')
    }
  }, [])

  return <SSEContext.Provider value={sse}>{children}</SSEContext.Provider>
}
