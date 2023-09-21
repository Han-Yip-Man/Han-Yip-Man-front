import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QzLmNvbSIsInVzZXJJZHgiOjE5LCJlbWFpbCI6InRlc3RAdGVzdDMuY29tIiwicm9sZSI6IkJVWUVSIiwiaWF0IjoxNjk1MjIzNTQyLCJleHAiOjE2OTUzOTYzNDJ9.ObTCccoJB3QlOdaXo2ckCuvwL8usmvHBi1ZBQH4SOIE'

const useSocket = (socketUrl: string) => {
  const [connected, setConnected] = useState(false)
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const newSocket = io(socketUrl, {
      query: { token },
    })
    setSocket(newSocket)

    newSocket.on('connect', () => {
      setConnected(true)
      console.log('소켓연결')
    })

    newSocket.on('disconnect', () => {
      setConnected(false)
      console.log('소켓연결끊김')
    })

    newSocket.on('get_error', (res) => {
      console.log('get_error 이벤트발생 : ', res)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [socketUrl])

  return { socket, connected }
}

export default useSocket
