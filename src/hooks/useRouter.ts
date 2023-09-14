import { useNavigate, useLocation } from 'react-router-dom'

const useRouter = () => {
  const router = useNavigate()
  const location = useLocation()

  return {
    currentPath: location.pathname,
    routeTo: (path: string) => router(path),
  }
}

export default useRouter
