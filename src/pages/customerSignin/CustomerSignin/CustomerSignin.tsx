import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../app/common/InputField'
import * as S from './CustomerSignin.style'
import { useTheme } from '@mui/material/styles'
import { FormDataType } from '../../../types/user'
import { signIn } from '../../../api/user'
import useAlert from '../../../hooks/useAlert'
import { KAKAO_AUTH_URL } from '../../../components/KaKaoLogin/AuthKaKao'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { tokenState } from '../../../atoms/userInfoAtoms'

const CustomerSignin = () => {
  const theme = useTheme()
  const toast = useAlert()
  const navigate = useNavigate()
  const setToken = useSetRecoilState(tokenState)
  const { register, handleSubmit, watch } = useForm<FormDataType>()
  const password = useRef<string | undefined>()
  password.current = watch('password')

  const onSubmit = async (data: FormDataType) => {
    const payload = {
      email: data.email,
      password: data.password,
    }

    signIn(payload)
      .then((response) => {
        sessionStorage.setItem('accessToken', response.accessToken)
        sessionStorage.setItem('role', response.role)
        sessionStorage.setItem('profileUrl', response.profileUrl)
        setToken(response.accessToken)
        toast('로그인에 성공했습니다.', 2000, 'success')
        navigate('/main')
      })
      .catch((error) => {
        toast('로그인 정보가 올바르지 않습니다.', 2000, 'error')
      })
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
      <S.KaKaoBtn href={KAKAO_AUTH_URL}>
        <img src="/img/kakaologin.jpg" alt="" />
      </S.KaKaoBtn>
    </S.Form>
  )
}
export default CustomerSignin
