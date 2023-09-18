import { useEffect, useState } from 'react'

type ReadyState = '연결중' | '연결됨' | '연결중단'

const useServerSentEvent = <T>(url: string) => {
  const [readyState, setReadyState] = useState<ReadyState>('연결중')
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const eventSource = new EventSource(url, { withCredentials: true }) // 토큰 쿠키에 저장해야함

    eventSource.onopen = () => {
      setReadyState('연결됨')
    }

    eventSource.onerror = () => {
      setReadyState('연결중단')
    }

    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data) as T)
    }

    return () => {
      eventSource.close()
      setReadyState('연결중단')
    }
  }, [url])

  return [data, readyState]
}

export default useServerSentEvent
