import RestaurantsManagementHeader from '../RestaurantsManagementHeader/RestaurantsManagementHeader'
import RestaurantsProfile from '../RestaurantsProfile/RestaurantsProfile'
import AddRestaurants from '../AddRestaurants/AddRestaurants'
import EditRestaurant from '../EditRestaurant/EditRestaurant'
import MainMenuCategory from '../MainMenuCategory/MainMenuCategory'
import AddMenu from '../AddMenu/AddMenu'
import * as S from './ManagementContainer.style'
import OrderManagement from '../OrderManagement/OrderManagement'
import { sellerDashboardNum } from '../../../recoil/restaurants'
import { useRecoilValue } from 'recoil'
import MenuContainer from '../MenuContainer/MenuContainer'

const ManagementContainer = () => {
  const pagenum = useRecoilValue(sellerDashboardNum)

  const renderManagement = () => {
    switch (pagenum) {
      case 1:
        return <RestaurantsProfile />
      case 2:
        return <MainMenuCategory />
      case 3:
        return <MenuContainer />
      case 4:
        return <OrderManagement />
      case 6:
        return <EditRestaurant />
      case 7:
        return <AddRestaurants />
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
