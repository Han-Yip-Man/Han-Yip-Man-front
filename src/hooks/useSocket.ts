import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2R3MjEzMkBhc2R3LmFjIiwidXNlcklkeCI6MTgsImVtYWlsIjoiYXNkdzIxMzJAYXNkdy5hYyIsInJvbGUiOiJTRUxMRVIiLCJpYXQiOjE2OTUxMDk0MDksImV4cCI6MTY5NTI4MjIwOX0.OqJviWIIrxf1tl4eHTpbdU6GjMJs3YvB-CJjperNJHs'

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

    return () => {
      newSocket.disconnect()
    }
  }, [socketUrl])

  return { socket, connected }
}

export default useSocket
