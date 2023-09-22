import axios, { AxiosInstance } from 'axios'

const BASE_URL = 'http://54.180.103.214:8080/api'

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosClient.interceptors.response.use((response) => {
  if (response.headers['authorization']) {
    const accessToken = response.headers['authorization']
    sessionStorage.setItem('accessToken', JSON.stringify(accessToken))
  }
  return response.data
})

axiosClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // FormData일때는 Content-Type을 설정하지않게했어요 axios에서 자동으로 multipart/form-data을 설정해준대요.
    delete config.headers['Content-Type']
  } else {
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
  }
  config.headers['X-API-VERSION'] = '1'

  // const token = sessionStorage.getItem('accessToken')
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXN1bmdAZ21haWwuY29tIiwidXNlcklkeCI6MTMsImVtYWlsIjoicGFzdW5nQGdtYWlsLmNvbSIsInJvbGUiOiJTRUxMRVIiLCJuaWNrbmFtZSI6InBhc3VuZyIsImlhdCI6MTY5NTMyODQ4OSwiZXhwIjoxNjk1NTAxMjg5fQ.Out3Zo7VD0zW9iGUdhRwALFJDwxH2bL0aDK9EZoEROI'

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export default axiosClient
