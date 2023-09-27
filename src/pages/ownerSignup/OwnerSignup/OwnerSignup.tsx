import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../common/InputField'
import * as S from './OwnerSignup.style'
import { useTheme } from '@mui/material/styles'
import { FormDataType } from '../../../types/user'
import { ownerSignUp } from '../hooks/api'
import useAlert from '../../common/hooks/useAlert'
import { emailCheck } from '../../common/hooks/api'
import { useNavigate } from 'react-router-dom'

const OwnerSignup = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<FormDataType>()
  const password = useRef<string | undefined>()
  password.current = watch('password')
  const email = watch('email')
  const toast = useAlert()

  const onSubmit = (data: FormDataType) => {
    const payload = {
      businessNumber: data.BusinessNumber,
      email: data.email,
      nickName: data.nickname,
      password: data.password,
      passwordCheck: data.password_confirm,
      phoneNumber: data.phoneNumber,
    }

    ownerSignUp(payload)
      .then((response) => {
        toast('회원가입에 성공했습니다.', 2000, 'success')
        navigate('/auth/sellersignin')
      })
      .catch((error) => {
        toast('회원가입에 실패했습니다.', 2000, 'error')
      })
  }

  const checkIdDuplication = async () => {
    const emailRegex = /^\S+@\S+$/i
    const emailtrim = email?.trim()
    // 정규식을 이용한 이메일 형식 검사
    if (!emailRegex.test(emailtrim as string)) {
      toast('유효하지 않은 이메일 형식입니다.', 3000, 'error')
      return // 유효하지 않은 형식이면 함수를 종료합니다.
    }

    if (emailtrim && emailtrim.length > 0) {
      try {
        await emailCheck({ checkEmail: emailtrim })
        toast('사용가능한 아이디입니다.', 3000, 'success')
      } catch (error) {
        toast('이미 사용중인 아이디입니다.', 3000, 'error')
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Logobox>
        <img src="/img/mainlogo.svg" alt="" />
      </S.Logobox>
      <S.Title>
        <h1 style={{ color: theme.palette.custom.main }}>사장님 회원가입</h1>
      </S.Title>

      <InputField
        label="아이디"
        type="email"
        placeholder="아이디는 이메일 형식입니다."
        {...register('email', {
          required: true,
          minLength: 5,
          maxLength: 50,
          pattern: /^\S+@\S+$/i,
        })}
        errorMessage={isSubmitted && errors.email && '이메일 형식으로 작성해야 합니다.'}
        checkDuplication={() => checkIdDuplication()}
      />

      <InputField
        label="비밀번호"
        type="password"
        placeholder="영어와 숫자를 조합하여 6글자 이상"
        {...register('password', {
          required: true,
          minLength: 6,
          maxLength: 30,
          pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        })}
        errorMessage={
          isSubmitted && errors.password && '영어와 숫자를 조합하여 6글자 이상 입력해야 합니다.'
        }
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        {...register('password_confirm', {
          required: true,
          validate: (value) => value === password.current,
        })}
        errorMessage={
          isSubmitted && errors.password_confirm && '패스워드를 다시 한번 입력해주세요.'
        }
      />

      <InputField
        type="text"
        label="핸드폰번호"
        maxLength={11}
        placeholder="핸드폰 번호를 입력해주세요."
        {...register('phoneNumber', { required: true, pattern: /^(01)\d{8,9}$/ })}
        onChange={handleInputChange}
        errorMessage={isSubmitted && errors.phoneNumber && '정확한 휴대폰 번호를 입력해주세요.'}
      />

      <InputField
        label="닉네임"
        placeholder="한글 혹은 영문만을 사용하여 2~6글자 사이"
        {...register('nickname', {
          required: true,
          minLength: 2,
          maxLength: 6,
          pattern: /^[가-힣A-Za-z]{2,6}$/,
        })}
        errorMessage={
          isSubmitted &&
          errors.nickname &&
          '한글 혹은 영문을 사용하여 2글자이상 6글자 이하로 입력해주세요.'
        }
      />

      <InputField
        label="사업자등록번호"
        type="text"
        maxLength={10}
        placeholder="사업자 등록 번호를 입력해주세요."
        {...register('BusinessNumber', { required: true, pattern: /^\d{10}$/ })}
        onChange={handleInputChange}
        errorMessage={
          isSubmitted && errors.BusinessNumber && '정확한 사업자 등록번호를 입력해주세요.'
        }
      />

      <S.SubmitBtn variant="contained" type="submit">
        회원가입
      </S.SubmitBtn>
    </S.Form>
  )
}
export default OwnerSignup
