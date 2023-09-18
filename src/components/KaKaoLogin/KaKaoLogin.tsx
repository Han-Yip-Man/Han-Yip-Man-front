import styled from '@emotion/styled'
import { useEffect } from 'react'
import axiosClient from '../../api/axiosInstance'

const KaKaoLogin = () => {
  const href = window.location.href
  const params = new URL(href).searchParams
  const code = params.get('code')

  console.log(params)
  console.log(code)

  useEffect(() => {
    axiosClient
      .get(`/auth/kakao/callback?code=${code}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return <></>
}

export default KaKaoLogin
