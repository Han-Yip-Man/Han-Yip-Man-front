import { useContext } from 'react'
import { SSEContext } from '../context/SSEProvider'

const useSSEContext = () => {
  return useContext(SSEContext)
}

export default useSSEContext
