import axiosClient from './axios'

// 사용자 회원가입
export const userSignUp = async (payload: UserSignUpPayload) => {
  try {
    const response = await axiosClient.post('/api/buyers/signup', payload)
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error)
    throw error
  }
}

export const OwnerSignUp = async (payload: OwnerSignUpPayload) => {
  try {
    const response = await axiosClient.post('/api/sellers/signup', payload)
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error)
    throw error
  }
}

// 로그인 공통
export const SignIn = async (payload: SignInType) => {
  try {
    const response = await axiosClient.post('/api/users/login', payload)
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error)
    throw error
  }
}
