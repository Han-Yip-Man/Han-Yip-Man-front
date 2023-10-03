import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../../api/axiosInstance'
import { ShopMenus } from '../types'
import { queryKeys } from '../../../react-query/querykey'

const getShopMenus = async (shopId: number | undefined): Promise<ShopMenus> => {
  const menuResponse = await axiosClient.get(`/buyer-shops/${shopId}/menus`)
  return menuResponse.data
}

const useMenu = (shopId: number) => {
  const { data } = useQuery([queryKeys.shopMenu, shopId], () => getShopMenus(shopId))

  return { data }
}

export default useMenu
