import axiosClient from '../../../api/axiosInstance'
import { MypageInfo, ReviewResponse } from '../types'

export const getMypageInfo = async (): Promise<MypageInfo> => {
  const response = await axiosClient.get(`/users/my-info`)
  console.log(response)
  return response.data
}

export const postReview = async (reviewRequest: FormData): Promise<ReviewResponse> => {
  return await axiosClient.post(`/reviews`, reviewRequest)
}
