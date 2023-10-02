import {
  patchShopName,
  patchShopDescription,
  patchShopminOrderPrice,
  patchShopphoneNum,
  patchShopbusinessNumber,
  patchShopcategory,
} from '../../../api/restaurant'
import {
  patchMenuCategoryEdit,
  patchMenunameyEdit,
  patchMenudescriptionEdit,
  patchMenupriceEdit,
} from '../../../api/shopMenuEdit.api'

function useEditPatch() {
  const save = async (field: string, id: number, data: string | number) => {
    try {
      if (field === 'shopName' && typeof data === 'string') {
        return await patchShopName(id, data)
      } else if (field === 'shopDescription' && typeof data === 'string') {
        return await patchShopDescription(id, data)
      } else if (field === 'minOrderPrice' && typeof data === 'string') {
        return await patchShopminOrderPrice(id, data)
      } else if (field === 'shopPhone' && typeof data === 'string') {
        return await patchShopphoneNum(id, data)
      } else if (field === 'businessNumber' && typeof data === 'string') {
        return await patchShopbusinessNumber(id, data)
      } else if (field === 'categoryName' && typeof data === 'number') {
        return await patchShopcategory(id, data)
      } else if (field === 'categorygroups' && typeof data === 'number') {
        return await patchMenuCategoryEdit(id, data)
      } else if (field === 'menuName' && typeof data === 'string') {
        return await patchMenunameyEdit(id, data)
      } else if (field === 'menuDescription' && typeof data === 'string') {
        return await patchMenudescriptionEdit(id, data)
      } else if (field === 'menuPrice' && typeof data === 'string') {
        return await patchMenupriceEdit(id, data)
      } else {
        throw new Error(`존재하지 않는 항목입니다: ${field}`)
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    save,
  }
}

export default useEditPatch
