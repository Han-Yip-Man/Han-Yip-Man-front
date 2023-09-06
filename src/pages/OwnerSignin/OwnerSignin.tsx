import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../components/common/InputField'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { FormData } from '../../types/user'
import { SignIn } from '../../api/user'

const OwnerSignin = () => {
  const theme = useTheme()

  const { register, handleSubmit, watch } = useForm<FormData>()
  const password = useRef<string | undefined>()
  password.current = watch('password')

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      }

      const response = await SignIn(payload)
      console.log('로그인 성공:', response)
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Logobox>
        <img src="/img/mainlogo.svg" alt="" />
      </Logobox>
      <Title>
        <h1 style={{ color: theme.palette.custom.main }}>사장님 로그인</h1>
      </Title>
      <InputField label="아이디" type="email" {...register('email')} />

      <InputField label="비밀번호" type="password" {...register('password')} />

      <SubmitBtn variant="contained" type="submit">
        로그인
      </SubmitBtn>
    </Form>
  )
}
export default OwnerSignin

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 550px;
  width: 100%;
  gap: 10px;
`
const Logobox = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 200px;
    height: 70px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
`

const Title = styled.div`
  margin: 20px 0;
  h1 {
    font-size: 25px;
  }
`
const SubmitBtn = styled(Button)`
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
