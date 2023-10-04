import { ReactNode } from 'react'
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
import * as S from './CategoryBtns.style'

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

interface IBtn {
  id: number
  startIcon: ReactNode
  category: CategoryType
  title: string
  sx?: SxProps<Theme>
}

interface Props {
  currentCategory: ICategory
  changeCategory: (category: ICategory) => void
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

function CategoryBtns({ currentCategory, changeCategory }: Props) {
  return (
    <S.BtnGrid container justifyContent="center">
      {categoryBtns.map((btn) => (
        <S.CustomBtn
          key={btn.id}
          startIcon={btn.startIcon}
          active={btn.category === currentCategory.categoryName}
          onClick={() =>
            changeCategory({
              categoryId: btn.id,
              categoryName: btn.category,
            })
          }
        >
          {btn.title}
        </S.CustomBtn>
      ))}
    </S.BtnGrid>
  )
}

export default CategoryBtns
