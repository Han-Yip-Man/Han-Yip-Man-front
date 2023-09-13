import React, { useEffect, useState } from 'react'
import useRouter from '../hooks/useRouter'
import { User } from '../types/user'
import jwtDecode from 'jwt-decode'

interface GeneralLayoutProps {
  children: React.ReactNode
  isAdminPage?: boolean
}

const AuthComponent: React.FC<GeneralLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const { routeTo } = useRouter()

  const fetchUserProfile = () => {
    const token: string | null = localStorage.getItem('accessToken')

    let decoded: User | null = null

    if (token) {
      decoded = jwtDecode(token?.split(' ')[1]) as User
    }

    if (token === null) {
      routeTo('/login')
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
