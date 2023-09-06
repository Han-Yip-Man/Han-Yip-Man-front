import styled from '@emotion/styled'
import RestaurantsManagementHeader from './RestaurantsManagementHeader'
import React from 'react'
import RestaurantsProfile from './RestaurantsProfile'
import AddRestaurants from './AddRestaurants'
import EditRestaurant from './EditRestaurant'
import MainMenuCategory from './MainMenuCategory'
import Menumanagement from './Menumanagement'
import AddMenu from './AddMenu'

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
    <Wrapper>
      <RestaurantsManagementHeader />
      {renderManagement()}
    </Wrapper>
  )
}

export default ManagementContainer

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`
