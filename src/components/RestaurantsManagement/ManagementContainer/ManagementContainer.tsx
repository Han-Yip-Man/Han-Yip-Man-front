import RestaurantsManagementHeader from '../RestaurantsManagementHeader/RestaurantsManagementHeader'
import React from 'react'
import RestaurantsProfile from '../RestaurantsProfile/RestaurantsProfile'
import AddRestaurants from '../AddRestaurants/AddRestaurants'
import EditRestaurant from '../EditRestaurant/EditRestaurant'
import MainMenuCategory from '../MainMenuCategory/MainMenuCategory'
import Menumanagement from '../Menumanagement/Menumanagement'
import AddMenu from '../AddMenu/AddMenu'
import * as S from './ManagementContainer.style'

interface ContainerProps {
  menupage: number
  setMenupage: (value: number) => void
}

const ManagementContainer: React.FC<ContainerProps> = ({ menupage, setMenupage }) => {
  const renderManagement = () => {
    switch (menupage) {
      case 1:
        return <RestaurantsProfile setMenupage={setMenupage} />
      case 2:
        return <MainMenuCategory />
      case 3:
        return <Menumanagement setMenupage={setMenupage} />
      case 6:
        return <EditRestaurant setMenupage={setMenupage} />
      case 7:
        return <AddRestaurants setMenupage={setMenupage} />
      case 8:
        return <AddMenu />
      default:
        return null
    }
  }
  return (
    <S.Wrapper>
      <RestaurantsManagementHeader />
      {renderManagement()}
    </S.Wrapper>
  )
}

export default ManagementContainer
