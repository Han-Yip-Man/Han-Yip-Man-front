import { useEffect } from 'react'
import axiosClient from '../../api/axiosInstance'
import axios from 'axios'

const KaKaoLogin = () => {
  const href = window.location.href
  const params = new URL(href).searchParams
  const code = params.get('code')

  console.log(params)
  console.log(code)

  useEffect(() => {
    axios
      .get(`http://54.180.103.214:8080/auth/kakao/callback?code=${code}`)
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

export default KaKaoLogin
