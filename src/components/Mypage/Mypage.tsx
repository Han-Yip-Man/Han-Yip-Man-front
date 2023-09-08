import styled from '@emotion/styled'
import OrderDashboard from './OrderDashboard'
import { useState } from 'react'
import MyCoupon from './MyCoupon'
import UserTabController from './UserTabController'
import { CustomerMyPage } from './CustomerMyPage'

const Mypage = () => {
  const [menupage, setmenupage] = useState(0)

  return (
    <MypageWrap>
      <UserTabController setmenupage={setmenupage} />
      {menupage === 0 && <CustomerMyPage />}
      {menupage === 1 && <MyCoupon />}
      {menupage === 2 && <OrderDashboard />}
    </MypageWrap>
  )
}

export default Mypage

const MypageWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
