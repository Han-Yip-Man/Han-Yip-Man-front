import axios, { AxiosInstance } from 'axios'

const BASE_URL = '/api'
const token: string | null = localStorage.getItem('accessToken')

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosClient.interceptors.response.use((response) => {
  if (response.headers['authorization']) {
    const accessToken = response.headers['authorization'] // <----- 로그인 할때 토큰 저장
    localStorage.setItem('accessToken', accessToken)
  }
  return response.data
})

axiosClient.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  if (token) {
    config.headers['Authorization'] = `${token}`
  }

  return config
})
