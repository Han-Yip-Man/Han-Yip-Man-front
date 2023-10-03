import { useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

function useDebounce(value: string, delay: number) {
  const [debouncedKeyword, setDebouncedKeyword] = useState(value)
  const [isLoading, setIsLoading] = useState(false)
  const qc = useQueryClient()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setDebouncedKeyword(value)
      qc.removeQueries(['category'])
      setIsLoading(false)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return { debouncedKeyword, setDebouncedKeyword, isLoading }
}

export default useDebounce
