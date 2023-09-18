import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwidXNlcklkeCI6NCwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6IkJVWUVSIiwiaWF0IjoxNjk1MDM0NjI5LCJleHAiOjE2OTUyMDc0Mjl9.BUIr24fpAyU3rqNtS6usxFXeD6azWpPu1u7vul8cIU8'

const useSocket = (socketUrl: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(socketUrl, {
      query: { token },
    })
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [socketUrl])

  return socket
}

export default useSocket
