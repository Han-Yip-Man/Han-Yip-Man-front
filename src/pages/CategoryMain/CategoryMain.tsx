import { ReactNode, useCallback, useEffect, useState } from 'react'
import * as S from './CategoryMain.style'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import DensitySmallIcon from '@mui/icons-material/DensitySmall'
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined'
import BrunchDiningOutlinedIcon from '@mui/icons-material/BrunchDiningOutlined'
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { PiBowlFood } from 'react-icons/pi'
import { TbEggFried, TbMeat } from 'react-icons/tb'
import { IoCafeOutline } from 'react-icons/io5'
import { Box } from '@mui/material'
import { userAddr } from '../../atoms/addressAtoms'
import { QueryFunction, useInfiniteQuery } from '@tanstack/react-query'
import { fetchStoreData } from '../../api/categoryMainApi'
import { useRecoilValue } from 'recoil'
import StoreCard from '../../components/categoryMain/StoreCard'
import useRouter from '../../hooks/useRouter'
import useAlert from '../../hooks/useAlert'
import useDebounce from '../../hooks/useDebounce'
import useInput from '../../hooks/useInput'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

type CategoryType =
  | 'all'
  | 'korean'
  | 'snack'
  | 'cafe'
  | 'japan'
  | 'chicken'
  | 'pizza'
  | 'restaurant'
  | 'chinese'
  | 'jokbal'
  | 'night'

type FilterType = 'distance' | 'review' | 'rating' | 'deliveryFee'

interface ICategory {
  categoryName: CategoryType
  categoryId: number
}

interface IBtn {
  id: number
  startIcon: ReactNode
  category: CategoryType
  title: string
  sx?: SxProps<Theme>
}

interface IFilter {
  id: number
  title: string
  filterName: FilterType
}

const categoryBtns: IBtn[] = [
  {
    id: 0,
    startIcon: <DensitySmallIcon />,
    category: 'all',
    title: '전체',
  },
  {
    id: 1,
    startIcon: <PiBowlFood />,
    category: 'korean',
    title: '한식',
  },
  {
    id: 2,
    startIcon: <TbEggFried />,
    category: 'snack',
    title: '분식',
  },
  {
    id: 3,
    startIcon: <IoCafeOutline />,
    category: 'cafe',
    title: '카페 / 디저트',
  },
  {
    id: 4,
    startIcon: <S.SushiIcon src="/img/sushi.png" />,
    category: 'japan',
    title: '돈까스 / 회 / 일식',
  },
  {
    id: 5,
    startIcon: <S.ChickenIcon src="/img/chicken.png" />,
    category: 'chicken',
    title: '치킨',
  },
  {
    id: 6,
    startIcon: <LocalPizzaOutlinedIcon />,
    category: 'pizza',
    title: '피자',
  },
  {
    id: 7,
    startIcon: <BrunchDiningOutlinedIcon />,
    category: 'restaurant',
    title: '아시안 / 양식',
  },
  {
    id: 8,
    startIcon: <RamenDiningOutlinedIcon />,
    category: 'chinese',
    title: '중국집',
  },
  {
    id: 9,
    startIcon: <TbMeat />,
    category: 'jokbal',
    title: '족발 / 보쌈',
  },
  {
    id: 10,
    startIcon: <DarkModeOutlinedIcon />,
    category: 'night',
    title: '야식',
  },
]

const filterBtns: IFilter[] = [
  {
    id: 1,
    title: '거리 순',
    filterName: 'distance',
  },
  {
    id: 2,
    title: '리뷰 순',
    filterName: 'review',
  },
  {
    id: 3,
    title: '평점 순',
    filterName: 'rating',
  },
  {
    id: 4,
    title: '배달비 순',
    filterName: 'deliveryFee',
  },
]

function CategoryMain() {
  const { value: searchKeyword, onChange } = useInput('')
  const { debouncedKeyword } = useDebounce(searchKeyword, 600)
  const [currentCategory, setCurrentCategory] = useState<ICategory>({
    categoryId: 0,
    categoryName: 'all',
  })
  const [currentFilter, setCurrentFilter] = useState<FilterType>('distance')
  const currentAddr = useRecoilValue(userAddr)
  const { routeTo } = useRouter()
  const toastAlert = useAlert()

  const fetchData: QueryFunction<any, string[]> = useCallback(
    async ({ pageParam = null }) => {
      const cursorParam = pageParam ? `&cursor=${pageParam}` : ''
      const keyword = debouncedKeyword.trim()
      const searchParam = keyword ? `&searchKeyword=${keyword}` : ''
      // const sortParam = `&sortType=${currentFilter}`
      try {
        const response = await fetchStoreData(
          `categoryId=${currentCategory.categoryId}&size=${10}${searchParam}${cursorParam}`,
        )

        if (!response) {
          throw new Error('응답이 없습니다.')
        }

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    [currentCategory, debouncedKeyword, currentFilter],
  )

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['category', currentCategory.categoryName, debouncedKeyword, currentFilter],
    fetchData,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  )

  const observer = useIntersectionObserver(fetchNextPage, hasNextPage)

  // 옵저버 걸어서 무한스크롤 테스트 하면 됌

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (currentAddr.id === '') {
      toastAlert('주소가 없습니다.', 3000, 'error')
      return routeTo('/')
    }

    // currentAddr 이 바뀔때마다
    // 새로운 주소 기반으로 데이터 요청 비회원은 좌표로 데이터 요청 비회원 api 생기면
    // 비회원 api에 따라서 url 바꿔야할수도 있음
  }, [currentAddr])

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
        <S.BtnGrid container justifyContent="center">
          {categoryBtns.map((btn) => (
            <S.CustomBtn
              key={btn.id}
              startIcon={btn.startIcon}
              active={btn.category === currentCategory.categoryName}
              onClick={() =>
                setCurrentCategory({
                  categoryId: btn.id,
                  categoryName: btn.category,
                })
              }
            >
              {btn.title}
            </S.CustomBtn>
          ))}
        </S.BtnGrid>
        <S.FilterWrap>
          <S.FilterBtnWrap variant="text">
            {filterBtns.map((filter) => (
              <S.FilterBtn
                key={filter.id}
                active={filter.filterName === currentFilter}
                onClick={() => setCurrentFilter(filter.filterName)}
              >
                {filter.title}
              </S.FilterBtn>
            ))}
          </S.FilterBtnWrap>
        </S.FilterWrap>
      </S.BtnWrap>
      <Box sx={{ width: 1, mb: '70px' }}>
        <S.Wrap>
          {data?.pages[0].shopLists.map((shop: StoreDetail) => (
            <StoreCard key={shop.shopId} {...shop} isLoading={isFetching} />
          ))}
        </S.Wrap>
      </Box>
      <S.CustomFab onClick={MoveToTop}>
        <S.CustomUpIcon />
        Top
      </S.CustomFab>
    </S.MainWrap>
  )
}

export default CategoryMain
