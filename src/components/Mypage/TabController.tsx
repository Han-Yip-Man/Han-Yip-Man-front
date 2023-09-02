import React from 'react'
import styled from '@emotion/styled'

type TabControllerProps = {
  setmenupage: React.Dispatch<React.SetStateAction<number>>
}

const TabController: React.FC<TabControllerProps> = ({ setmenupage }) => {
  return (
    <TabWrapper>
      <div className="mypage_title">마이페이지</div>
      <div className="mypage_couponmenu" onClick={() => setmenupage(1)}>
        쿠폰관리
      </div>
      <div className="mypage_ordermenu" onClick={() => setmenupage(2)}>
        주문내역
      </div>
    </TabWrapper>
  )
}

export default TabController

const TabWrapper = styled.div`
  width: 220px;
  height: 100%;
  background-color: #f2cd00;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
  border: 1px solid #f2cd00;
  .mypage_title,
  .mypage_couponmenu,
  .mypage_ordermenu {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
  .mypage_title {
    background-color: #ea7600;
    color: #fff;
  }
  .mypage_couponmenu,
  .mypage_ordermenu {
    background-color: #fff;
    color: #000;
    &:hover {
      transition: all 0.3s;
      background-color: #ea7600;
      cursor: pointer;
    }
  }
`
