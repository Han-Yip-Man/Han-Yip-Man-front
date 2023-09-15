import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const useSocket = (socketUrl: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(socketUrl)
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [socketUrl])

  return socket
}

export default useSocket
