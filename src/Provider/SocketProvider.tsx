import { createContext, ReactNode } from 'react'
import { useSocket } from '../hooks'
import { Socket } from 'socket.io-client'

type SocketState = {
  socket: Socket | undefined
  connected: boolean
}

export const SocketContext = createContext<SocketState>({ socket: undefined, connected: false })

export const SocketProvider = ({ children, token }: { children: ReactNode; token: string }) => {
  const { socket, connected } = useSocket('ws://58.123.150.14:8088', token)

  return <SocketContext.Provider value={{ socket, connected }}>{children}</SocketContext.Provider>
}
