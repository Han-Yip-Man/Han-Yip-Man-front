import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../../api/axiosInstance'
import { MypageInfo } from '../types'
import { queryKeys } from '../../../react-query/querykey'

export const getMypageInfo = async (): Promise<MypageInfo> => {
  const response = await axiosClient.get(`/users/my-info`)
  console.log(response)
  return response.data
}

const useMypageInfo = () => {
  const { data } = useQuery([queryKeys.mypage], () => getMypageInfo())

  return { data }
}

export default useMypageInfo
