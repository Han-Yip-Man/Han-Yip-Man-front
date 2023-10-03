import OrderDashboard from '../orderDashboard/OrderDashboard'
import { useEffect, useState } from 'react'
import MyCoupon from '../myCoupon/MyCoupon'
import UserTabController from '../userTabController/UserTabController'
import * as S from './Mypage.style'
import { CustomerOrderDetail } from '../customerOrderDetail/CustomerOrderDetail'
import { CustomerMyPageInfo } from '../customerMypageInfo/CustomerMyPageInfo'
import { useRecoilValue } from 'recoil'
import { UserInfoType } from '../../../types/user'
import { userInfo } from '../../../atoms/userInfoAtoms'
import { useRouter } from '../../common/hooks'

const Mypage = () => {
  const [menupage, setmenupage] = useState(0)
  const [orderIdParam, setOrderIdParam] = useState(0)
  const { routeTo } = useRouter()
  const user = useRecoilValue(userInfo) as UserInfoType

  useEffect(() => {
    if (user.role === 'SELLER') {
      routeTo('/dashboard/seller')
    }
  }, [])

  return (
    <S.MypageWrap>
      <UserTabController setmenupage={setmenupage} />
      {menupage === 0 && <CustomerMyPageInfo />}
      {menupage === 1 && <MyCoupon />}
      {menupage === 2 && (
        <OrderDashboard setmenupage={setmenupage} setOrderIdParam={setOrderIdParam} />
      )}
      {menupage === 3 && (
        <CustomerOrderDetail
          setmenupage={setmenupage}
          orderIdParam={orderIdParam}
          setOrderIdParam={setOrderIdParam}
        />
      )}
    </S.MypageWrap>
  )
}

export default Mypage
