import React from 'react'
import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SignInSelectionPage = () => {
  const navigate = useNavigate()

  const gobuyersignup = () => {
    navigate('/auth/usersignup')
  }

  const gosellersignup = () => {
    navigate('/auth/sellersignup')
  }

  return (
    <Wrapper>
      <SelectBox>
        <ImgBox>
          <img src="/img/buyersign.png" alt="" />
        </ImgBox>
        <Description>사용자</Description>
        <BuyerBtn onClick={gobuyersignup}>회원가입하기</BuyerBtn>
      </SelectBox>
      <SelectBox>
        <ImgBox>
          <img src="/img/sellersign.png" alt="" />
        </ImgBox>
        <Description>사장님</Description>
        <SellerBtn onClick={gosellersignup}>회원가입하기</SellerBtn>
      </SelectBox>
    </Wrapper>
  )
}

export default SignInSelectionPage

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`
const SelectBox = styled.div`
  width: 400px;
  height: 400px;
  background-color: #f4f9ff;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ImgBox = styled.div`
  width: 200px;
  height: 200px;
  margin-top: 25px;
  img {
    width: 100%;
    height: 100%;
  }
`

const Description = styled.div`
  font-size: 40px;
  margin-top: 10px;
`

const BuyerBtn = styled(Button)`
  margin-top: 30px;
  font-size: 30px;
  background-color: #ea7600;
  color: #fff;
  padding: 10px 50px;
  border-radius: 40px;
  &:hover {
    background-color: #ea7600;
    color: #fff;
    opacity: 0.7;
  }
`

const SellerBtn = styled(Button)`
  margin-top: 30px;
  font-size: 30px;
  background-color: #45a5f1;
  color: #fff;
  padding: 10px 50px;
  border-radius: 40px;
  &:hover {
    background-color: #45a5f1;
    color: #fff;
    opacity: 0.7;
  }
`
