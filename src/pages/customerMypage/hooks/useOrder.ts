import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../../../api/customerOrder'

const useOrder = (orderIdParam: number) => {
  const { data } = useQuery(['order', orderIdParam], () => getOrder(orderIdParam))
  return { data }
}

export default useOrder
