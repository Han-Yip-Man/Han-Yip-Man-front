import styled from '@emotion/styled'
import Button from '@mui/material/Button'

export const AddressBtnbox = styled.div`
  display: flex;
  height: 56px;
  width: 100%;
  gap: 30px;
`

export const AddressBtn = styled(Button)`
  width: 500px;
  font-size: 18px;
  background-color: #ea7600;
  &:hover {
    background-color: #ea7600;
    opacity: 0.8;
  }
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 550px;
  width: 100%;
  gap: 10px;
`
export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 200px;
    height: 70px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
`
export const Title = styled.div`
  margin: 20px 0;
  h1 {
    font-size: 25px;
  }
`
export const SubmitBtn = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: 30px;
  color: #fff;
  border-color: transparent;
  background-color: #ea7600;
  &:hover {
    border-color: transparent;
    background-color: #ea9600;
  }
`