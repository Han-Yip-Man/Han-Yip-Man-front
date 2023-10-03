import * as S from './FilterBtns.style'

interface IFilter {
  id: number
  title: string
  filterName: FilterType
}

interface Props {
  currentFilter: FilterType
  changeFilter: (filterName: FilterType) => void
}

const filterBtns: IFilter[] = [
  {
    id: 1,
    title: '최신 순',
    filterName: 'CREATED_AT',
  },
  {
    id: 2,
    title: '리뷰 순',
    filterName: 'COUNT_REVIEW',
  },
  {
    id: 3,
    title: '평점 순',
    filterName: 'AVG_RATING',
  },
  {
    id: 4,
    title: '거리 순',
    filterName: 'DISTANCE',
  },
]

function FilterBtns({ currentFilter, changeFilter }: Props) {
  return (
    <S.FilterWrap>
      <S.FilterBtnWrap variant="text">
        {filterBtns.map((filter) => (
          <S.FilterBtn
            key={filter.id}
            active={filter.filterName === currentFilter}
            onClick={() => changeFilter(filter.filterName)}
          >
            {filter.title}
          </S.FilterBtn>
        ))}
      </S.FilterBtnWrap>
    </S.FilterWrap>
  )
}

export default FilterBtns
