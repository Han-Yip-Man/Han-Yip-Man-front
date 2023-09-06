import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../components/common/InputField'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { FormData } from '../../types/user'

const OwnerSignup = () => {
  const theme = useTheme()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<FormData>()
  const password = useRef<string | undefined>()
  password.current = watch('password')

  const onSubmit = (data: FormData) => {
    console.log('data', data)
  }

  //중복체크 검사할떄 쓸 함수~~
  const checkIdDuplication = () => {}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Logobox>
        <img src="/img/mainlogo.svg" alt="" />
      </Logobox>
      <Title>
        <h1 style={{ color: theme.palette.custom.main }}>사장님 회원가입</h1>
      </Title>

      <InputField
        label="아이디"
        type="email"
        placeholder="아이디는 이메일 형식입니다."
        {...register('email', { required: true, minLength: 5, pattern: /^\S+@\S+$/i })}
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

      <SubmitBtn variant="contained" type="submit">
        회원가입
      </SubmitBtn>
    </Form>
  )
}
export default OwnerSignup

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
