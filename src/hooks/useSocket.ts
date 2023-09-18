import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwidXNlcklkeCI6NCwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6IkJVWUVSIiwiaWF0IjoxNjk1MDM0NjI5LCJleHAiOjE2OTUyMDc0Mjl9.BUIr24fpAyU3rqNtS6usxFXeD6azWpPu1u7vul8cIU8'

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
      console.log('연결')
    })

    newSocket.on('disconnect', () => {
      setConnected(false)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [socketUrl])

  return { socket, connected }
}

export default useSocket
