import { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { selectedShopIdState, shopDetailState } from '../atoms/restaurantsAtoms'
import { getShopDetail } from '../api/restaurant'

export const useGetshopDeatil = () => {
  const currentId = useRecoilValue(selectedShopIdState)
  const [shop, setShop] = useRecoilState(shopDetailState)

  useEffect(() => {
    const fetchDetails = async () => {
      if (currentId !== undefined) {
        try {
          const response = await getShopDetail(currentId)
          setShop(response)
        } catch (error) {
          console.error('에러', error)
        }
      }
    }
    fetchDetails()
  }, [currentId, setShop])

  return { shop, currentId }
}
