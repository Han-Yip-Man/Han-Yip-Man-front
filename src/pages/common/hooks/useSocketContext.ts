import { useContext } from 'react'
import { SocketContext } from '../../../Provider/SocketProvider'

const useSocketContext = () => {
  return useContext(SocketContext)
}

export default useSocketContext
