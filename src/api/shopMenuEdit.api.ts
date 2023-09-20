import axiosClient from './axiosInstance'

//메뉴 대분류카테고리 변경
export const patchMenuCategoryEdit = async (menuId: number, data: number) => {
  try {
    const response = await axiosClient.patch(
      `/seller-shops/menus/${menuId}/menuGroup?menuGroupId=${data}`,
    )
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//메뉴 이름 변경
export const patchMenunameyEdit = async (menuId: number, data: string) => {
  try {
    const response = await axiosClient.patch(`/seller-shops/menus/${menuId}/name?name=${data}`)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//메뉴 설명 변경
export const patchMenudescriptionEdit = async (menuId: number, data: string) => {
  try {
    const response = await axiosClient.patch(
      `/seller-shops/menus/${menuId}/description?description=${data}`,
    )
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//메뉴 가격 변경
export const patchMenupriceEdit = async (menuId: number, data: string) => {
  try {
    const response = await axiosClient.patch(`/seller-shops/menus/${menuId}/price?price=${data}`)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//메뉴 썸네일사진 변경
export const patchMenuthumbnailEdit = async (menuId: number, formdata: FormData) => {
  try {
    const response = await axiosClient.patch(`/seller-shops/menus/${menuId}/thumbnail`, formdata)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//메뉴 제거
export const deleteMenu = async (menuId: number) => {
  try {
    const response = await axiosClient.delete(`/seller-shops/menus/${menuId}`)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}
