import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../common/InputField'
import * as S from './OwnerSignin.style'
import { useTheme } from '@mui/material/styles'
import { FormDataType } from '../../../types/user'
import { signIn } from '../../common/hooks/api'
import useAlert from '../../common/hooks/useAlert'
import { useNavigate } from 'react-router-dom'
import { tokenState } from '../../../atoms/userInfoAtoms'
import { useSetRecoilState } from 'recoil'

const OwnerSignin = () => {
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
        navigate('/dashboard/seller')
      })
      .catch(() => {
        toast('로그인 정보가 올바르지 않습니다.', 2000, 'error')
      })
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Logobox>
        <img src="/img/mainlogo.svg" alt="" />
      </S.Logobox>
      <S.Title>
        <h1 style={{ color: theme.palette.custom.main }}>사장님 로그인</h1>
      </S.Title>
      <InputField label="아이디" type="email" {...register('email')} />

      <InputField label="비밀번호" type="password" {...register('password')} />

      <S.SubmitBtn variant="contained" type="submit">
        로그인
      </S.SubmitBtn>
    </S.Form>
  )
}
export default OwnerSignin
