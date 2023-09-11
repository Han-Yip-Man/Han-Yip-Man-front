import styled from '@emotion/styled'
import RestaurantsManagementHeader from './RestaurantsManagementHeader/RestaurantsManagementHeader'
import React from 'react'
import RestaurantsProfile from './RestaurantsProfile/RestaurantsProfile'
import AddRestaurants from './AddRestaurants/AddRestaurants'
import EditRestaurant from './EditRestaurant/EditRestaurant'
import MainMenuCategory from './MainMenuCategory/MainMenuCategory'
import Menumanagement from './Menumanagement/Menumanagement'
import OrderManagement from './OrderManagement'

interface ContainerProps {
  menupage: number
  setMenupage: (value: number) => void
}

const ManagementContainer: React.FC<ContainerProps> = ({ menupage, setMenupage }) => {
  return (
    <Wrapper>
      <RestaurantsManagementHeader />
      {menupage === 1 && <RestaurantsProfile setMenupage={setMenupage} />}
      {menupage === 2 && <MainMenuCategory />}
      {menupage === 3 && <Menumanagement setMenupage={setMenupage} />}
      {menupage === 4 && <OrderManagement />}
      {menupage === 6 && <EditRestaurant setMenupage={setMenupage} />}
      {menupage === 7 && <AddRestaurants setMenupage={setMenupage} />}
    </Wrapper>
  )
}

export default ManagementContainer

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`
