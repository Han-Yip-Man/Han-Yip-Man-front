import {
  patchShopName,
  patchShopDescription,
  patchShopminOrderPrice,
  patchShopphoneNum,
  patchShopbusinessNumber,
  patchShopcategory,
} from '../api/restaurant'

function useShopinfoPatch() {
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

export default useShopinfoPatch
