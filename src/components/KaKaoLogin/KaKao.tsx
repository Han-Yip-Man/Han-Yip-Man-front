import { useEffect } from 'react'
import axiosClient from '../../api/axiosInstance'
import { useAlert } from '../../hooks'
import { useNavigate } from 'react-router-dom'

const KaKao = () => {
  const href = window.location.href
  const params = new URL(href).searchParams
  const code = params.get('code')
  const toast = useAlert()
  const navigator = useNavigate()

  useEffect(() => {
    axiosClient
      .get(`/auth/kakao/login?code=${code}`)
      .then((response) => {
        sessionStorage.setItem('accessToken', response.data.accessToken)
        sessionStorage.setItem('role', response.data.role)
        sessionStorage.setItem('profileUrl', response.data.profileUrl)
        sessionStorage.setItem('nickname', response.data.nickname)
        toast('로그인에 성공했습니다.', 2000, 'success')
        navigator('/main')
      })
      .catch((error) => {
        console.error(error)
        toast('로그인에 실패했습니다.', 2000, 'error')
      })
  }, [])

  return <></>
}

export default KaKao
