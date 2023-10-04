import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const useSocket = (socketUrl: string, token: string | null) => {
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
