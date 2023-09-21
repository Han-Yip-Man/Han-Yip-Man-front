import axiosClient from './axiosInstance'
import {
  AddMenuGroupsType,
  DeleteMenuGroupsType,
  PatchMenuGroupsType,
  PatchindexMenuGroupsType,
  addsellerMenuType,
} from '../types/restaurantsAtom'

// 가게등록
export const addShop = async (payload: FormData) => {
  try {
    const response = await axiosClient.post('/seller-shops', payload)
    return response.data
  } catch (error) {
    console.error('에러', error)
  }
}

//가게이름 중복체크
export const shopNameCheck = async (payload: string) => {
  try {
    const response = await axiosClient.get(`/seller-shops/shops/duplication?shopName=${payload}`)

    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }

    return response.data
  } catch (error) {
    console.error('에러', error)
    throw error
  }
}

// 가게삭제
export const deleteShop = async (payload: number) => {
  try {
    const response = await axiosClient.delete(`/seller-shops/shops/${payload}`)

    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('에러', error)
    throw error
  }
}

//내 가게들 조회
export const getShop = async () => {
  try {
    const response = await axiosClient.get('/seller-shops/shops')
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('조회 실패', error)
    throw error
  }
}

//가게 상세 조회
export const getShopDetail = async (payload: number | null) => {
  try {
    const response = await axiosClient.get(`/seller-shops/shops/${payload}`)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('조회 실패', error)
    throw error
  }
}

//가게 메뉴 대분류 조회
export const getMenuGroups = async (payload: number | null) => {
  try {
    const response = await axiosClient.get(`/seller-shops/menu-groups/${payload}`)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('조회 실패', error)
    throw error
  }
}

//가게 대분류 등록
export const addMenuGroups = async (payload: AddMenuGroupsType) => {
  try {
    const response = await axiosClient.post(`/seller-shops/menu-groups/${payload.shop_id}`, {
      menuGroupName: payload.menuGroupName,
    })
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//가게 대분류 삭제
export const deleteMenuGroups = async (payload: DeleteMenuGroupsType) => {
  try {
    const response = await axiosClient.delete(
      `/seller-shops/menu-groups/${payload.shop_id}?menuGroupId=${payload.menuGroupId}`,
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

//가게 대분류 수정
export const patchMenuGroups = async (payload: PatchMenuGroupsType) => {
  try {
    const response = await axiosClient.patch(`/seller-shops/menu-groups/${payload.shop_id}/name`, {
      menuGroupId: payload.menuGroupId,
      menuGroupName: payload.menuGroupName,
    })
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//가게 대분류 순서 수정
export const patchindexMenuGroups = async (payload: PatchindexMenuGroupsType) => {
  try {
    const response = await axiosClient.patch(`/seller-shops/menu-groups/${payload.shop_id}`, [
      {
        menuGroupId: payload.menuGroupId,
        menuGroupSequence: payload.menuGroupSequence,
      },
    ])
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//가게 메뉴 등록
export const addsellerMenu = async (payload: addsellerMenuType) => {
  try {
    const response = await axiosClient.post(
      `/seller-shops/menus/${payload.groupid}`,
      payload.formdata,
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

//가게 메뉴 조회
export const getsellerMenu = async (payload: number | null) => {
  try {
    const response = await axiosClient.get(`/seller-shops/menus/${payload}`)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//가게 이름 수정
export const patchShopName = async (currentId: number, data: string) => {
  try {
    const response = await axiosClient.patch(
      `/seller-shops/shops/${currentId}/name?shopName=${data}`,
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

//가게 설명 수정
export const patchShopDescription = async (currentId: number, data: string) => {
  try {
    const response = await axiosClient.patch(
      `/seller-shops/shops/${currentId}/description?description=${data}`,
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

//가게 사업자번호 변경
export const patchShopbusinessNumber = async (currentId: number, data: string) => {
  try {
    const response = await axiosClient.patch(
      `/seller-shops/shops/${currentId}/business-number?businessNumber=${data}`,
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

//가게 최소주문금액 변경
export const patchShopminOrderPrice = async (currentId: number, data: string) => {
  try {
    const response = await axiosClient.patch(
      `/seller-shops/shops/${currentId}/min-order-price?minOrderPrice=${data}`,
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

//가게 전화번호 변경
export const patchShopphoneNum = async (currentId: number, data: string) => {
  try {
    const response = await axiosClient.patch(
      `/seller-shops/shops/${currentId}/phone-number?phoneNum=${data}`,
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

//가게 카테고리 변경
export const patchShopcategory = async (currentId: number, data: number) => {
  try {
    const response = await axiosClient.patch(
      `/seller-shops/shops/${currentId}/category?categoryId=${data + 1}`,
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

//가게 대표이미지 변경
export const patchShopbanner = async (currentId: number, formdata: FormData) => {
  try {
    const response = await axiosClient.patch(`/seller-shops/shops/${currentId}/banner`, formdata)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}

//가게 배너이미지 변경
export const patchShopthumbnail = async (currentId: number, formdata: FormData) => {
  try {
    const response = await axiosClient.patch(`/seller-shops/shops/${currentId}/thumbnail`, formdata)
    if (response.status >= 400) {
      throw new Error(`Server responded with status code ${response.status}`)
    }
    return response.data
  } catch (error) {
    console.error('실패', error)
    throw error
  }
}
