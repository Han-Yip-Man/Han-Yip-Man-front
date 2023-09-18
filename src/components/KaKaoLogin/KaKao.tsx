import { useEffect } from 'react'
import axiosClient from '../../api/axiosInstance'

const KaKao = () => {
  const href = window.location.href
  const params = new URL(href).searchParams
  const code = params.get('code')

  console.log(params)
  console.log(code)
  console.log(code)

  useEffect(() => {
    axiosClient
      .get(`/auth/kakao/login?code=${code}`)
      .then((response) => {
        console.log(response)
        console.log('어흥')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return <>어흥</>
}

export default KaKao
