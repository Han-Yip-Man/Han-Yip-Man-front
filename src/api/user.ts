import axiosClient from './axiosInstance'
interface APIPayload {
  endpoint: string
  payload: FormData | OwnerSignUpPayload | SignInType | EmailCheckType
  errorMessage: string
  method: 'GET' | 'POST'
}

const apiRequest = async ({ endpoint, payload, errorMessage, method }: APIPayload) => {
  try {
    const response = await axiosClient({
      method,
      url: endpoint,
      data: method === 'GET' ? undefined : payload,
      params: method === 'GET' ? payload : undefined,
    })
    return response.data
  } catch (error) {
    console.error(errorMessage, error)
    throw error
  }
}

//사용자 회원가입
export const userSignUp = (payload: FormData) =>
  apiRequest({
    endpoint: '/buyers/signup',
    payload,
    errorMessage: '회원가입 실패',
    method: 'POST',
  })

//싸장님 회원가입
export const ownerSignUp = (payload: OwnerSignUpPayload) =>
  apiRequest({
    endpoint: '/sellers/signup',
    payload,
    errorMessage: '회원가입 실패',
    method: 'POST',
  })

//공통 로그인
export const signIn = (payload: SignInType) =>
  apiRequest({
    endpoint: '/users/login',
    payload,
    errorMessage: '로그인 실패',
    method: 'POST',
  })

//이메일 중복체크
export const emailCheck = (payload: EmailCheckType) =>
  apiRequest({
    endpoint: '/users/check-email-duplicate',
    payload,
    errorMessage: '존재하는 아이디입니다',
    method: 'GET',
  })
