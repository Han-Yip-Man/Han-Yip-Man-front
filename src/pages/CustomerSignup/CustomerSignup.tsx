import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../components/common/InputField'
import * as S from './CustomerSignup.style'
import { useTheme } from '@mui/material/styles'
import { FormData } from '../../types/user'
import useAddressSearch from '../../hooks/useAddressSearch'
import { DaumPostcodeData } from '../../types/Address'
import { userSignUp } from '../../api/user'

const CustomerSignup = () => {
  const theme = useTheme()
  const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  const openPostcodePopup = useAddressSearch(scriptUrl)

  const [address, setAddress] = useState<DaumPostcodeData | null>({
    address: '',
    zonecode: '',
    addressEnglish: '',
    addressType: '',
    userSelectedType: '',
    roadAddress: '',
    roadAddressEnglish: '',
    jibunAddress: '',
    jibunAddressEnglish: '',
    bname: '',
    buildingName: '',
    apartment: '',
    coordinates: null,
  })

  const handleAddressPopup = () => {
    openPostcodePopup()
      .then((result) => {
        if (result) {
          setAddress((prevState) => ({
            ...prevState,
            address: result.address,
            zonecode: result.zonecode,
            coordinates: result.coordinates,
          }))
        }
      })
      .catch((err: Error) => {
        console.error(err)
      })
  }

  console.log(address)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<FormData>()
  const password = useRef<string | undefined>()
  password.current = watch('password')

  const onSubmit = async (data: FormData) => {
    try {
      const { coordinates } = address || {}

      const payload = {
        address: data.address,
        addressDetail: data.detailaddress,
        email: data.email,
        latitude: Number(parseFloat(coordinates?.latitude || '0').toFixed(6)),
        longitude: Number(parseFloat(coordinates?.longitude || '0').toFixed(6)),
        nickName: data.nickname,
        password: data.password,
        passwordCheck: data.password_confirm,
        phoneNumber: data.phoneNumber,
        profileImageFile: '',
      }

      const response = await userSignUp(payload)
      console.log('회원가입 성공:', response)
    } catch (error) {
      console.error('회원가입 실패:', error)
    }
  }

  //중복체크 검사할떄 쓸 함수~~
  const checkIdDuplication = () => {}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.LogoBox>
        <img src="/img/mainlogo.svg" alt="" />
      </S.LogoBox>
      <S.Title>
        <h1 style={{ color: theme.palette.custom.main }}>사용자 회원가입</h1>
      </S.Title>

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
      <S.AddressBtnbox>
        <InputField
          label="우편번호"
          type="text"
          value={address ? address.zonecode : ''}
          {...register('zonecode', { required: true })}
        />
        <S.AddressBtn variant="contained" onClick={handleAddressPopup}>
          주소 입력하기
        </S.AddressBtn>
      </S.AddressBtnbox>

      <InputField
        label="주소"
        type="text"
        value={address ? address.address : ''}
        {...register('address', { required: true })}
        errorMessage={isSubmitted && errors.address && '주소를 입력해 주세요.'}
      />

      <InputField
        label="상세주소"
        type="text"
        maxLength={25}
        {...register('detailaddress', {
          required: true,
          pattern: /^[가-힣0-9\s]+$/,
        })}
        errorMessage={
          isSubmitted &&
          errors.detailaddress &&
          (errors.detailaddress.type === 'pattern'
            ? '상세주소는 한글과 숫자만 입력 가능합니다.'
            : '상세주소를 입력해 주세요.')
        }
      />
      <S.SubmitBtn variant="contained" type="submit">
        회원가입
      </S.SubmitBtn>
    </S.Form>
  )
}
export default CustomerSignup
