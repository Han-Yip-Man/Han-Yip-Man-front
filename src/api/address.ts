import axiosClient from './axiosInstance'

interface Response {
  result: boolean
  status: number
  message: string
}

export const getUserAddr = async () => {
  const response = await axiosClient.get('/addresses')
  return response.data
}

export const regUserAddrPost = async (queryString: string) => {
  return await axiosClient.post(`/addresses/register?${queryString}`)
}

export const delUserAddr = async (id: number): Promise<Response> => {
  return await axiosClient.delete(`/addresses/${id}`)
}

export const setDefaultAddr = async (id: number): Promise<Response> => {
  return await axiosClient.post(`/addresses/set-default-address?defaultAddressId=${id}`)
}
