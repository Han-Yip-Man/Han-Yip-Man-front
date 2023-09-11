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
import { ReactNode, useState } from 'react'
import * as S from './CategoryMain.style'
import { Box } from '@mui/material'
import StoreCard from './StoreCard'

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

interface BtnImp {
  id: number
  startIcon: ReactNode
  category: CategoryType
  title: string
  sx?: SxProps<Theme>
}

interface FilterImp {
  id: number
  title: string
  filterName: FilterType
}

const categoryBtns: BtnImp[] = [
  {
    id: 1,
    startIcon: <DensitySmallIcon />,
    category: 'all',
    title: '전체',
  },
  {
    id: 2,
    startIcon: <PiBowlFood />,
    category: 'korean',
    title: '한식',
  },
  {
    id: 3,
    startIcon: <TbEggFried />,
    category: 'snack',
    title: '분식',
  },
  {
    id: 4,
    startIcon: <IoCafeOutline />,
    category: 'cafe',
    title: '카페 / 디저트',
  },
  {
    id: 5,
    startIcon: <S.SushiIcon src="/img/sushi.png" />,
    category: 'japan',
    title: '돈까스 / 회 / 일식',
  },
  {
    id: 6,
    startIcon: <S.ChickenIcon src="/img/chicken.png" />,
    category: 'chicken',
    title: '치킨',
  },
  {
    id: 7,
    startIcon: <LocalPizzaOutlinedIcon />,
    category: 'pizza',
    title: '피자',
  },
  {
    id: 8,
    startIcon: <BrunchDiningOutlinedIcon />,
    category: 'restaurant',
    title: '분식',
  },
  {
    id: 9,
    startIcon: <RamenDiningOutlinedIcon />,
    category: 'chinese',
    title: '중국집',
  },
  {
    id: 10,
    startIcon: <TbMeat />,
    category: 'jokbal',
    title: '족발 / 보쌈',
  },
  {
    id: 11,
    startIcon: <DarkModeOutlinedIcon />,
    category: 'night',
    title: '야식',
  },
]

const filterBtns: FilterImp[] = [
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
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('all')
  const [currentFilter, setCurrentFilter] = useState<FilterType>('distance')

  const MoveToTop = () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <S.CategoryImg />
      <S.BtnWrap>
        <S.CustomGrid>
          <S.SearchInput placeholder="맛집 이름을 검색해보세요 🤤" />
        </S.CustomGrid>
        <S.BtnGrid container justifyContent="center">
          {categoryBtns.map((btn) => (
            <S.CustomBtn
              key={btn.id}
              startIcon={btn.startIcon}
              active={btn.category === currentCategory}
              onClick={() => setCurrentCategory(btn.category)}
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
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
        </S.Wrap>
      </Box>
      <S.CustomFab onClick={MoveToTop}>
        <S.CustomUpIcon />
        Top
      </S.CustomFab>
    </div>
  )
}

export default CategoryMain
