import { useEffect } from 'react'
import axiosClient from '../../api/axiosInstance'

const KaKao = () => {
  const href = window.location.href
  const params = new URL(href).searchParams
  const code = params.get('code')

  useEffect(() => {
    axiosClient
      .get(`/auth/kakao/login?code=${code}`)
      .then((response) => {
        console.log(response)
        console.log('axios push test')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return <>어흥</>
}

export default KaKao
