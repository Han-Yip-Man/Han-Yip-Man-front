import styled from '@emotion/styled'
import RestaurantsTabController from './RestaurantsTabController'
import { useState } from 'react'
import ManagementContainer from './ManagementContainer'

const RestaurantsManagement = () => {
  const [menupage, setMenupage] = useState(1)

  return (
    <Wrapper>
      <RestaurantsTabController setMenupage={setMenupage} />
      <ManagementContainer menupage={menupage} setMenupage={setMenupage} />
    </Wrapper>
  )
}

export default RestaurantsManagement

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
