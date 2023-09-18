import { useCallback, useRef } from 'react'
import { QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'

function useInfiniteScroll<T>(
  queryKey: QueryKey,
  fetchFunction: ({ pageParam }: { pageParam?: null | undefined }) => Promise<T>,
  queryOption: Omit<UseInfiniteQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status, isFetching } =
    useInfiniteQuery(queryKey, fetchFunction, queryOption)

  const observer = useRef<IntersectionObserver | null>(null)

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (isFetchingNextPage) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isFetchingNextPage, hasNextPage],
  )

  return { data, error, status, lastElementRef, isFetching }
}

export default useInfiniteScroll
