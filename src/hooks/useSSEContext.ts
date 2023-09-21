import { useContext } from 'react'
import { SSEContext } from '../Provider/SSEProvider'

const useSSEContext = () => {
  return useContext(SSEContext)
}

export default useSSEContext
