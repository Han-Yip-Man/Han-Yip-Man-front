import { useEffect, useRef, useState } from 'react'

type Callback = () => void

const useIntersection = (
  callback: Callback,
  hasNextPage: boolean | undefined,
): ((node: Element | null) => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [node, setNode] = useState<Element | null>(null)

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          callback()
        }
      },
      { threshold: 0.5 },
    )

    if (node) observerRef.current.observe(node)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [node, callback])

  return setNode
}

export default useIntersection
