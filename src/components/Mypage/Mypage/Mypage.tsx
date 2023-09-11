import OrderDashboard from '../OrderDashboard/OrderDashboard'
import { useState } from 'react'
import MyCoupon from '../MyCoupon/MyCoupon'
import UserTabController from '../UserTabController/UserTabController'
import * as S from './Mypage.style'
import { CustomerOrderDetail } from '../CustomerOrderDetail'

const Mypage = () => {
  const [menupage, setmenupage] = useState(1)

  return (
    <S.MypageWrap>
      <UserTabController setmenupage={setmenupage} />
      {menupage === 1 && <MyCoupon />}
      {menupage === 2 && <OrderDashboard setmenupage={setmenupage} />}
      {menupage === 3 && <CustomerOrderDetail setmenupage={setmenupage} />}
    </S.MypageWrap>
  )
}

export default Mypage
