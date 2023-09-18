import axiosClient from './axios'

// /api/buyer-shops/menus/{menu_id}
// 메뉴 상세 조회
export const getMenuDetail = async (payload: number | null) => {
  const response = await axiosClient.get(`/api/buyer-shops/menus/${payload}`)
  return response
}
