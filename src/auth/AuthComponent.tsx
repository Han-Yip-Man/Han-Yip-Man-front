import React, { useEffect, useState } from 'react'
import { User } from '../types/user'
import jwtDecode from 'jwt-decode'
import { useRouter } from '../pages/common/hooks'

interface GeneralLayoutProps {
  children: React.ReactNode
  isAdminPage?: boolean
}

const AuthComponent: React.FC<GeneralLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const { routeTo } = useRouter()

  const fetchUserProfile = () => {
    const token: string | null = sessionStorage.getItem('accessToken')

    let decoded: User | null = null

    if (token) {
      decoded = jwtDecode(token) as User
    }

    if (token === null) {
      // routeTo('/selectedsignin')
      return
    }

    if (decoded) {
      setUserProfile(decoded)
    }
  }

  if (userProfile) {
    //userProfile
  }

  useEffect(() => {
    fetchUserProfile()
  }, [children])

  return <>{children}</>
}

export default AuthComponent
