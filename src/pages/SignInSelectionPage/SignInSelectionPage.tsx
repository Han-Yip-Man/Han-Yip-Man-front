import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SignInSelectionPage = () => {
  const navigate = useNavigate()

  const gotoSignup = () => {
    navigate('/selectedsignup')
  }

  const gobuyersignin = () => {
    navigate('/auth/usersignin')
  }

  const gosellersignin = () => {
    navigate('/auth/sellersignin')
  }

  return (
    <Wrapper>
      <SelectBox>
        <ImgBox>
          <img src="/img/gosignup.png" alt="" />
        </ImgBox>
        <Description>회원이 아니세요?</Description>
        <SignupBtn onClick={gotoSignup}>회원가입하기</SignupBtn>
      </SelectBox>
      <SelectBox>
        <ImgBox>
          <img src="/img/buyersign.png" alt="" />
        </ImgBox>
        <Description>사용자</Description>
        <BuyerBtn onClick={gobuyersignin}>로그인하기</BuyerBtn>
      </SelectBox>
      <SelectBox>
        <ImgBox>
          <img src="/img/sellersign.png" alt="" />
        </ImgBox>
        <Description>사장님</Description>
        <SellerBtn onClick={gosellersignin}>로그인하기</SellerBtn>
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
  gap: 30px;
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

const SignupBtn = styled(Button)`
  margin-top: 30px;
  font-size: 30px;
  background-color: #f8bc2a;
  color: #fff;
  padding: 10px 50px;
  border-radius: 40px;
  &:hover {
    background-color: #f8bc2a;
    color: #fff;
    opacity: 0.7;
  }
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
