import styled from '@emotion/styled'
import RestaurantsManagement from '../../components/RestaurantsManagement/RestaurantsManagement'

const OwnerDashboard = () => {
  return (
    <Wrapper>
      <RestaurantsManagement />
    </Wrapper>
  )
}

export default OwnerDashboard

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
