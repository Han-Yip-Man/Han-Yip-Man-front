import axios, { AxiosInstance } from 'axios'

const BASE_URL = 'http://54.180.103.214:8080'

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosClient.interceptors.response.use((response) => {
  if (response.headers['authorization']) {
    const accessToken = response.headers['authorization']
    localStorage.setItem('accessToken', accessToken)
  }
  return response.data
})

axiosClient.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  config.headers['X-API-VERSION'] = '1'

  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers['Authorization'] = `${token}`
  }

  return config
})

export default axiosClient
