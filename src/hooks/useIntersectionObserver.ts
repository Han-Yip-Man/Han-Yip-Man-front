import { RefObject, useEffect, useRef } from 'react'

const useIntersectionObserver = (
  fetchNextPage: () => void,
  hasNextPage?: boolean | undefined,
): RefObject<IntersectionObserver> => {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    return () => {
      if (observer.current) {
        observer.current.disconnect()
        observer.current = null
      }
    }
  }, [fetchNextPage, hasNextPage])

  return observer
}

export default useIntersectionObserver
