import axiosClient from './axiosInstance'
import { getStoreDetail } from './storeDetail'

export const getOrder = async (orderId: number) => {
  const response = await axiosClient.get(`orders/${orderId}`)
  const orderData = response.data

  const storeData = await getStoreDetail(orderData.shopId)
  const latitude = storeData.storeDetail.info.shopAddressResponse.latitude,
    longitude = storeData.storeDetail.info.shopAddressResponse.longitude

  return Object.assign(orderData, { lat: latitude, lng: longitude })
}

export const getOrders = async () => {
  const cursor = 10,
    size = 10
  const response = await axiosClient.get(`orders?cursor=${cursor}&size=${size}`)
  return response.data
}

export const getOrdersInf = async (cursor: number) => {
  const size = 2
  const reviewInfResponse = await axiosClient.get(`orders?cursor=${cursor}&size=${size}`)
  return reviewInfResponse.data
}
