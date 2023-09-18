import axiosClient from './axiosInstance'

type Address = {
  addressNumber: number
  address: string
  detailAddress: string
  latitude: number
  longitude: number
  isDefault: boolean
}

type MypageInfo = {
  userNumber: number
  buyNumber: number
  sellerNumber: number | undefined
  email: string
  phoneNumber: string
  nickName: string
  businessNumber: number | undefined
  role: string
  profileImageUrl: string
  addressList: Address[]
}
export const getMypageInfo = async (): Promise<MypageInfo> => {
  const response = await axiosClient.get(`/users/my-info`)
  return response.data
}

type ReviewResponse = {
  message: string
  result: boolean
  status: number
}

export const postReview = async (reviewRequest: FormData): Promise<ReviewResponse> => {
  const response = await axiosClient.post(`/reviews`, reviewRequest)
  return response.data
}
