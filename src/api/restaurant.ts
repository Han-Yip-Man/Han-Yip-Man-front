import axiosClient from './axios'
import {
  AddMenuGroupsType,
  DeleteMenuGroupsType,
  PatchMenuGroupsType,
  PatchindexMenuGroupsType,
} from '../types/restaurantsAtom'

// 가게등록
export const addShop = async (payload: FormData) => {
  try {
    const response = await axiosClient.post('/api/seller-shops', payload)
    return response.data
  } catch (error) {
    console.error('에러', error)
  }
}

//가게이름 중복체크
export const shopNameCheck = async (payload: string) => {
  try {
    const response = await axiosClient.get(
      `/api/seller-shops/shops/duplication?shopName=${payload}`,
    )

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
    const response = await axiosClient.delete(`/api/seller-shops/shops/${payload}`)

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
    const response = await axiosClient.get('/api/seller-shops/shops')
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
    const response = await axiosClient.get(`/api/seller-shops/shops/${payload}`)
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
    const response = await axiosClient.get(`/api/seller-shops/menu-groups/${payload}`)
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
    const response = await axiosClient.post(`/api/seller-shops/menu-groups/${payload.shop_id}`, {
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
      `/api/seller-shops/menu-groups/${payload.shop_id}?menuGroupId=${payload.menuGroupId}`,
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
    const response = await axiosClient.patch(
      `/api/seller-shops/menu-groups/${payload.shop_id}/name`,
      {
        menuGroupId: payload.menuGroupId,
        menuGroupName: payload.menuGroupName,
      },
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

//가게 대분류 순서 수정
export const patchindexMenuGroups = async (payload: PatchindexMenuGroupsType) => {
  try {
    const response = await axiosClient.patch(`/api/seller-shops/menu-groups/${payload.shop_id}`, [
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

export const patchindexMenuGroups = async (payload: PatchindexMenuGroupsType) => {
  try {
    const response = await axiosClient.patch(`/api/seller-shops/menus/${payload.menugroupid}`, {
      description: 'string',
      menuName: 'string',
      options: [
        {
          isMultiple: true,
          maxSelected: 0,
          optionItems: [
            {
              itemName: 'string',
              itemPrice: 0,
            },
          ],
          optionName: 'string',
        },
      ],
      price: 0,
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
