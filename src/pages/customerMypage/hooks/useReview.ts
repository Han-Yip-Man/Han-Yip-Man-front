import { useMutation } from '@tanstack/react-query'
import axiosClient from '../../../api/axiosInstance'
import { ReviewResponse } from '../types'
import { useAlert } from '../../common/hooks'

const postReview = async (reviewRequest: FormData): Promise<ReviewResponse> => {
  return await axiosClient.post(`/reviews`, reviewRequest)
}

const useReview = () => {
  const toast = useAlert()
  const { mutate } = useMutation(postReview, {
    onSuccess: (res) => {
      toast(res.message, 3000, 'info')
    },
    onError: (error) => console.log(error),
  })

  return { mutate }
}

export default useReview
