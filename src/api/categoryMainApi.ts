import axiosClient from './axiosInstance'

export const fetchStoreData = async (queryString: string): Promise<StoreListResponse> => {
  const response: ResponseData<StoreListResponse> = await axiosClient.get(
    `/buyer-shops${queryString}`,
  )

  if (!response.data) {
    throw new Error('API response does not contain data')
  }

  console.log(response.data)

  return response.data
}
