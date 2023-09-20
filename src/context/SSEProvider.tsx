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
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2R3MjEzMkBhc2R3LmFjIiwidXNlcklkeCI6MTgsImVtYWlsIjoiYXNkdzIxMzJAYXNkdy5hYyIsInJvbGUiOiJTRUxMRVIiLCJpYXQiOjE2OTUxOTk0MDEsImV4cCI6MTY5NTM3MjIwMX0.EVB7VQ0BkS9QJvExKB5n6IXZlbgpVWY-SoFpuJILIGs'

  useEffect(() => {
    // if(!token) return
    const newSSE = new EventSource('http://39.115.156.83:8080/api/sse', {
      headers: {
        Authorization: token,
        Accept: 'text/event-stream',
        'X-API-VERSION': '1',
      },
      heartbeatTimeout: 120000,
    })
    setSse(newSSE)

    newSSE.onopen = () => {
      console.log('SSE 연결')
    }
    return () => {
      newSSE.close()
    }
  }, [])

  return <SSEContext.Provider value={sse}>{children}</SSEContext.Provider>
}
