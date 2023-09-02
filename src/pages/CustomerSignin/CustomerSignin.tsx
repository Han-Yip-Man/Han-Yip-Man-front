import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../components/common/InputField'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { FormData } from '../../types/user'

const CustomerSignin = () => {
  const theme = useTheme()

  const { register, handleSubmit, watch } = useForm<FormData>()
  const password = useRef<string | undefined>()
  password.current = watch('password')

  const onSubmit = (data: FormData) => {
    console.log('data', data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mainlogo_box">
        <img src="/img/mainlogo.svg" alt="" />
      </div>
      <div className="signin_title">
        <h1 style={{ color: theme.palette.custom.main }}>사용자 로그인</h1>
      </div>
      <InputField label="아이디" type="email" {...register('email')} />

      <InputField label="비밀번호" type="password" {...register('password')} />

      <Button className="submit_btn" variant="contained" type="submit">
        로그인
      </Button>
      <div className="kakaologin_btn">
        <img src="/img/kakaologin.jpg" alt="" />
      </div>
    </Form>
  )
}
export default CustomerSignin

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 550px;
  width: 100%;
  gap: 10px;

  .mainlogo_box {
    display: flex;
    justify-content: center;
    img {
      width: 200px;
      height: 70px;
      margin-top: 50px;
      margin-bottom: 20px;
    }
  }
  .submit_btn {
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
  }
  .signin_title {
    margin: 20px 0;
    h1 {
      font-size: 25px;
    }
  }
  .kakaologin_btn {
    width: 100%;
    height: 60px;
    margin-top: 20px;
    img {
      width: 100%;
      height: 60px;
    }
  }
`
