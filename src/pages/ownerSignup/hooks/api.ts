import axiosClient from '../../../api/axiosInstance'

// 싸장님 회원가입
export const ownerSignUp = async (payload: OwnerSignUpPayload) => {
  const response = await axiosClient.post('/sellers/signup', payload)

  if (response.status >= 400) {
    console.error('회원가입 실패')
    throw new Error('회원가입 실패')
  }

  return response.data
}
