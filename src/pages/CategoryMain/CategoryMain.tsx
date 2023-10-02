import * as S from './CategoryMain.style'
import { useRecoilValue } from 'recoil'
import { userAddr } from '../../atoms/addressAtoms'
import { useEffect, useState } from 'react'
import { useRouter, useAlert } from '../common/hooks'
import { useDebouncedSearchStore } from './hooks'
import { ErrorBoundary } from 'react-error-boundary'
import { MoveToTop, ErrorFallback } from '../common/components'
import { CategoryBtns, FilterBtns, StoreList } from './components'
import { QueryErrorResetBoundary, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../react-query/querykey'

const CategoryMain = () => {
  const currentAddr = useRecoilValue(userAddr)
  const toast = useAlert()
  const qc = useQueryClient()
  const { routeTo } = useRouter()
  const { debouncedKeyword, onChange, searchKeyword } = useDebouncedSearchStore()
  const [currentFilter, setCurrentFilter] = useState<FilterType>('CREATED_AT')
  const [currentCategory, setCurrentCategory] = useState<ICategory>({
    categoryId: 0,
    categoryName: 'all',
  })

  const changeCategory = (category: ICategory) => {
    setCurrentCategory(category)
  }

  const changeFilter = (filterName: FilterType) => {
    setCurrentFilter(filterName)
  }

  useEffect(() => {
    if (currentAddr.id === '') {
      toast('메인 페이지에서 주소를 선택해주세요.', 3000, 'error')
      return routeTo('/')
    }

    return () => {
      qc.removeQueries([queryKeys.category])
    }
  }, [])

  return (
    <S.MainWrap>
      <S.CategoryImg />
      <S.BtnWrap>
        <S.CustomGrid>
          <S.SearchInput
            placeholder="맛집 이름을 검색해보세요 🤤"
            value={searchKeyword}
            onChange={onChange}
          />
        </S.CustomGrid>
        <CategoryBtns currentCategory={currentCategory} changeCategory={changeCategory} />
        <FilterBtns currentFilter={currentFilter} changeFilter={changeFilter} />
      </S.BtnWrap>
      <QueryErrorResetBoundary>
        {(reset) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => reset.reset()}>
            <StoreList
              currentCategory={currentCategory}
              debouncedKeyword={debouncedKeyword}
              currentFilter={currentFilter}
            />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <MoveToTop />
    </S.MainWrap>
  )
}

export default CategoryMain
