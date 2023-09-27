import axiosClient from '../../../api/axiosInstance'

// 공통 로그인
export const signIn = async (payload: SignInType) => {
  const response = await axiosClient.post('/users/login', payload)

  if (response.status >= 400) {
    console.error('로그인 실패')
    throw new Error('로그인 실패')
  }

  return response.data
}

// 이메일 중복체크
export const emailCheck = async (payload: EmailCheckType) => {
  const response = await axiosClient.get('/users/check-email-duplicate', {
    params: payload,
  })

  if (response.status >= 400) {
    console.error('존재하는 아이디입니다')
    throw new Error('존재하는 아이디입니다')
  }

  return response.data
}
