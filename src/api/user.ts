import axiosClient from './axios'
interface APIPayload {
  endpoint: string
  payload: UserSignUpPayload | OwnerSignUpPayload | SignInType
  errorMessage: string
}

const apiRequest = async ({ endpoint, payload, errorMessage }: APIPayload) => {
  try {
    const response = await axiosClient.post(endpoint, payload)
    return response.data
  } catch (error) {
    console.error(errorMessage, error)
    throw error
  }
}

//사용자 회원가입
export const userSignUp = (payload: UserSignUpPayload) =>
  apiRequest({
    endpoint: '/api/buyers/signup',
    payload,
    errorMessage: '회원가입 실패:',
  })

//싸장님 회원가입
export const OwnerSignUp = (payload: OwnerSignUpPayload) =>
  apiRequest({
    endpoint: '/api/sellers/signup',
    payload,
    errorMessage: '회원가입 실패:',
  })

//공통 로그인
export const SignIn = (payload: SignInType) =>
  apiRequest({
    endpoint: '/api/users/login',
    payload,
    errorMessage: '로그인 실패:',
  })
