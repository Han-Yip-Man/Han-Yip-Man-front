import React from 'react'
import styled from '@emotion/styled'

type TabControllerProps = {
  setmenupage: React.Dispatch<React.SetStateAction<number>>
}

const UserTabController: React.FC<TabControllerProps> = ({ setmenupage }) => {
  return (
    <TabWrapper>
      <Title>마이페이지</Title>
      <TabMenu onClick={() => setmenupage(0)}>마이페이지</TabMenu>
      <TabMenu onClick={() => setmenupage(1)}>쿠폰관리</TabMenu>
      <TabMenu onClick={() => setmenupage(2)}>주문내역</TabMenu>
    </TabWrapper>
  )
}

export default UserTabController

const TabWrapper = styled.div`
  width: 220px;
  height: 100%;
  background-color: #f2cd00;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
  border: 1px solid #f2cd00;
`
const Title = styled.div`
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: #ea7600;
  color: #fff;
`

const TabMenu = styled.div`
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: #fff;
  color: #000;
  &:hover {
    transition: all 0.3s;
    background-color: #ea7600;
    cursor: pointer;
  }
`
