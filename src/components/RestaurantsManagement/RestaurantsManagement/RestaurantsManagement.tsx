import RestaurantsTabController from '../RestaurantsTabController/RestaurantsTabController'
import { useEffect } from 'react'
import ManagementContainer from '../ManagementContainer/ManagementContainer'
import * as S from './RestaurantsManagement.style'
import { getShop } from '../../../api/restaurant'
import { useSetRecoilState } from 'recoil'
import { shopListState } from '../../../recoil/restaurants'

const RestaurantsManagement = () => {
  const setShopList = useSetRecoilState(shopListState)

  useEffect(() => {
    const getmyRestaurants = async () => {
      try {
        const response = await getShop()
        setShopList(response)
      } catch (error) {
        console.error(error)
      }
    }
    getmyRestaurants()
  }, [])

  return (
    <S.Wrapper>
      <RestaurantsTabController />
      <ManagementContainer />
    </S.Wrapper>
  )
}

export default RestaurantsManagement
