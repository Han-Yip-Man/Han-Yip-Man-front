import * as S from './OwnerDashboard.style'
import RestaurantsManagement from '../../components/RestaurantsManagement/RestaurantsManagement/RestaurantsManagement'
import { userInfo } from '../../atoms/userInfoAtoms'
import { useRecoilValue } from 'recoil'
import { UserInfoType } from '../../types/user'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const OwnerDashboard = () => {
  const user = useRecoilValue<UserInfoType | null>(userInfo)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user.role === 'BUYER') {
        navigate('/dashboard/user')
      }
    }
  }, [])

  return (
    <S.Wrapper>
      <RestaurantsManagement />
    </S.Wrapper>
  )
}

export default OwnerDashboard
