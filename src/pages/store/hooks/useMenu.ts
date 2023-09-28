import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../../api/axiosInstance'
import { StoreMenus } from '../types'
import { queryKeys } from '../../../react-query/querykey'

const getStoreMenus = async (shopId: number | undefined): Promise<StoreMenus> => {
  const menuResponse = await axiosClient.get(`/buyer-shops/${shopId}/menus`)
  return menuResponse.data
}

const useMenu = (storeId: number) => {
  const { data } = useQuery([queryKeys.storeMenu, storeId], () => getStoreMenus(storeId))

  return { data }
}

export default useMenu
