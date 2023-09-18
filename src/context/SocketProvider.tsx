import { createContext, ReactNode } from 'react'
import { useSocket } from '../hooks'
import { Socket } from 'socket.io-client'

type SocketState = {
  socket: Socket | undefined
  connected: boolean
}

const SocketContext = createContext<SocketState>({ socket: undefined, connected: false })

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { socket, connected } = useSocket('ws://58.123.150.14:8088')
  const sse = new EventSource('http://http://54.180.103.214:8080/api/sse')

  return <SocketContext.Provider value={{ socket, connected }}>{children}</SocketContext.Provider>
}
