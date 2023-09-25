import React from 'react'
import * as S from './UserTabController.style'

type TabControllerProps = {
  setmenupage: React.Dispatch<React.SetStateAction<number>>
}

const UserTabController: React.FC<TabControllerProps> = ({ setmenupage }) => {
  return (
    <S.TabWrapper>
      <S.Title>마이페이지</S.Title>
      <S.TabMenu onClick={() => setmenupage(0)}>마이페이지</S.TabMenu>
      <S.TabMenu onClick={() => setmenupage(1)}>쿠폰관리</S.TabMenu>
      <S.TabMenu onClick={() => setmenupage(2)}>주문내역</S.TabMenu>
    </S.TabWrapper>
  )
}

export default UserTabController
