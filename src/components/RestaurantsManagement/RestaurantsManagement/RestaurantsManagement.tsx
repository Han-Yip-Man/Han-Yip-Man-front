import RestaurantsTabController from '../RestaurantsTabController/RestaurantsTabController'
import { useState, useEffect } from 'react'
import ManagementContainer from '../ManagementContainer/ManagementContainer'
import * as S from './RestaurantsManagement.style'
import { getShop } from '../../../api/restaurant'
import { useSetRecoilState } from 'recoil'
import { shopListState } from '../../../recoil/restaurants'

const RestaurantsManagement = () => {
  const [menupage, setMenupage] = useState(1)
  const setShopList = useSetRecoilState(shopListState)

  useEffect(() => {
    const getmyRestaurants = async () => {
      try {
        const response = await getShop()
        setShopList(response)
      } catch (error) {
        console.log(error)
      }
    }
    getmyRestaurants()
  }, [])

  return (
    <S.Wrapper>
      <RestaurantsTabController setMenupage={setMenupage} />
      <ManagementContainer menupage={menupage} setMenupage={setMenupage} />
    </S.Wrapper>
  )
}

export default RestaurantsManagement
