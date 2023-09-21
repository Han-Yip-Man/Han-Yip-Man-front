import axiosClient from './axiosInstance'

// 메뉴 상세 페이지에서 담은 데이터 -> 장바구니로 이동
export const getCartItems = async () => {
  const cursor = 11410,
    size = 10
  const response = await axiosClient.get(`carts?cursor=${cursor}&size=${size}`)
  return response
}

type addCartItemProps = {
  shopId: number //가게 ID
  menuId: number //선택 메뉴 ID
  options: number[] //선택된 옵션 IDS
  amount: number //선택한메뉴갯수
}

export const addCartItems = async (payload: addCartItemProps) => {
  // console.log(payload)
  const response = await axiosClient.post(`/carts`, payload)
  return response
}

export const deleteAllCartItems = async () => {
  const response = await axiosClient.delete(`/carts`)
  return response
}

export const selecteddeleteCartItems = async (cartId: number) => {
  const response = await axiosClient.delete(`/carts/${cartId}`)
  return response
}

type updateCountCartItemProps = {
  amount: number
  cartId: number
}

export const updateCountCartItems = async (payload: updateCountCartItemProps) => {
  console.log(payload)
  const response = await axiosClient.patch(`/carts`, payload)
  return response
}
