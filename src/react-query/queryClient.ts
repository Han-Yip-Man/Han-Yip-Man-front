import { ReactNode } from 'react'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { Args } from '../hooks/useAlert'

type ToastFnType<T, C extends ReactNode> = (...args: Args<T, C>) => void

function queryErrorHandler(error: unknown, toast: ToastFnType<unknown, ReactNode>): void {
  const message = error instanceof Error ? error.message : '서버 연결중 에러가 발생했습니다.'

  toast(message, 3000, 'error')
}

export function generateQueryClient(toast: ToastFnType<unknown, ReactNode>): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => queryErrorHandler(error, toast),
    }),
    mutationCache: new MutationCache({
      onError: (error) => queryErrorHandler(error, toast),
    }),
  })
}
