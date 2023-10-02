import { userAddr, userInfo } from '../../../atoms'
import { useRecoilValue } from 'recoil'
import { useCallback } from 'react'
import axiosClient from '../../../api/axiosInstance'
import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../react-query/querykey'

export const fetchStoreData = async (queryString: string): Promise<StoreListResponse> => {
  const response: ResponseData<StoreListResponse> = await axiosClient.get(
    `/buyer-shops${queryString}`,
  )

  if (!response.data) {
    throw new Error('API response does not contain data')
  }

  return response.data
}

interface Args {
  debouncedKeyword: string
  currentCategory: ICategory
  currentFilter: FilterType
}

const useCategoryMainData = ({ debouncedKeyword, currentCategory, currentFilter }: Args) => {
  const isLoggedIn = useRecoilValue(userInfo)
  const currentAddr = useRecoilValue(userAddr)

  const fetchData = useCallback(
    async ({ nextCursorId, nextCursorValue }: CursorParams) => {
      const nextCursorIdParam = nextCursorId ? `&cursorId=${nextCursorId}` : ''
      const nextCursorValueParam = nextCursorValue ? `&cursorValue=${nextCursorValue}` : ''
      const keyword = debouncedKeyword.trim()
      const searchParam = keyword ? `&searchKeyword=${keyword}` : ''
      const sortParam = `&sortType=${currentFilter}`
      const url = `categoryId=${
        currentCategory.categoryId
      }&size=${15}${searchParam}${nextCursorIdParam}${nextCursorValueParam}${sortParam}`
      const prefix = isLoggedIn
        ? '?'
        : `/guest?latitude=${currentAddr.lat}&longitude=${currentAddr.lng}&`

      return await fetchStoreData(`${prefix}${url}`)
    },
    [currentCategory, debouncedKeyword, currentFilter, isLoggedIn, currentAddr],
  )

  const query = useInfiniteQuery(
    [queryKeys.category, currentCategory.categoryName, debouncedKeyword, currentFilter],
    (pageParam: any) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage: StoreListResponse) => {
        if (!lastPage.nextCursorId) {
          return false
        }
        return { nextCursorId: lastPage.nextCursorId, nextCursorValue: lastPage.nextCursorValue }
      },
      useErrorBoundary: true,
      staleTime: 50000,
      cacheTime: 50000,
    },
  )

  return query
}

export default useCategoryMainData
