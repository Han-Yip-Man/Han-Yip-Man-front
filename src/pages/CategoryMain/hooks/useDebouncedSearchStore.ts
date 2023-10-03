import { useDebounce, useInput } from '../../common/hooks'

const useDebouncedSearchStore = () => {
  const { value: searchKeyword, onChange } = useInput('')
  const { debouncedKeyword } = useDebounce(searchKeyword, 600)

  return { debouncedKeyword, onChange, searchKeyword }
}

export default useDebouncedSearchStore
