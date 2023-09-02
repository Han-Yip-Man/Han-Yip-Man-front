import styled from '@emotion/styled'
import TabController from './TabController'
import OrderDashboard from './OrderDashboard'
import { useState } from 'react'
import MyCoupon from './MyCoupon'

const Mypage = () => {
  const [menupage, setmenupage] = useState(1)

  return (
    <MypageWrap>
      <TabController setmenupage={setmenupage} />
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
