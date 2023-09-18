import axiosClient from './axiosInstance'

interface Args {
  address_name: string
  place_name: string
  y: string
  x: string
  id: string
  road_address_name: string
}

export const registerUserAddress = ({
  address_name,
  place_name,
  y,
  x,
  id,
  road_address_name,
}: Args) =>
  axiosClient.post(
    `/addresses/register?address=${address_name}&addressDetail=${place_name}&latitude=${y}&longitude=${x}&mapId=${id}&roadAddress=${road_address_name}`,
  )

export const getAddressData = () => axiosClient.get('/addresses')

export const checkExistAddress = (mapId: string) =>
  axiosClient.get(`/addresses/duplication?mapId=${mapId}`)
