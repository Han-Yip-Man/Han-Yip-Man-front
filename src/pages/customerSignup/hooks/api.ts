import axiosClient from '../../../api/axiosInstance'

// 사용자 회원가입
export const userSignUp = async (payload: FormData) => {
  const response = await axiosClient.post('/buyers/signup', payload)

  if (response.status >= 400) {
    console.error('회원가입 실패')
    throw new Error('회원가입 실패')
  }

  return response.data
}
