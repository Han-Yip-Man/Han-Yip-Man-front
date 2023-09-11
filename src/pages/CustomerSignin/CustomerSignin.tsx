import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../components/common/InputField'
import * as S from './CustomerSignin.style'
import { useTheme } from '@mui/material/styles'
import { FormData } from '../../types/user'
import { SignIn } from '../../api/user'

const CustomerSignin = () => {
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
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Logobox>
        <img src="/img/mainlogo.svg" alt="" />
      </S.Logobox>
      <S.Title>
        <h1 style={{ color: theme.palette.custom.main }}>사용자 로그인</h1>
      </S.Title>
      <InputField label="아이디" type="email" {...register('email')} />

      <InputField label="비밀번호" type="password" {...register('password')} />

      <S.SubmitBtn variant="contained" type="submit">
        로그인
      </S.SubmitBtn>
      <S.KaKaoBtn>
        <img src="/img/kakaologin.jpg" alt="" />
      </S.KaKaoBtn>
    </S.Form>
  )
}
export default CustomerSignin
