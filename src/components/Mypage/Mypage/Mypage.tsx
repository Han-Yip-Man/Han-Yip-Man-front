import OrderDashboard from '../OrderDashboard/OrderDashboard'
import { useState } from 'react'
import MyCoupon from '../MyCoupon/MyCoupon'
import UserTabController from '../UserTabController/UserTabController'
import * as S from './Mypage.style'
import { CustomerMyPage } from '../CustomerMyPage'

const Mypage = () => {
  const [menupage, setmenupage] = useState(0)

  return (
    <S.MypageWrap>
      <UserTabController setmenupage={setmenupage} />
      {menupage === 0 && <CustomerMyPage />}
      {menupage === 1 && <MyCoupon />}
      {menupage === 2 && <OrderDashboard />}
    </S.MypageWrap>
  )
}

export default Mypage
