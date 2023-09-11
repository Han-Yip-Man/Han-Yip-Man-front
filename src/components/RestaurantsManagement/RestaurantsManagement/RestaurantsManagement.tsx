import RestaurantsTabController from '../RestaurantsTabController/RestaurantsTabController'
import { useState } from 'react'
import ManagementContainer from '../ManagementContainer/ManagementContainer'
import * as S from './RestaurantsManagement.style'

const RestaurantsManagement = () => {
  const [menupage, setMenupage] = useState(1)

  return (
    <S.Wrapper>
      <RestaurantsTabController setMenupage={setMenupage} />
      <ManagementContainer menupage={menupage} setMenupage={setMenupage} />
    </S.Wrapper>
  )
}

export default RestaurantsManagement
