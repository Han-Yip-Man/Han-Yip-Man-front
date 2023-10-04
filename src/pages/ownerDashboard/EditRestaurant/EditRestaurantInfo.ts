import { ShopField } from '../../../types/restaurantsAtom'

export const sections: { label: string; field: ShopField }[] = [
  { label: '상호명', field: 'shopName' },
  { label: '가게 설명', field: 'shopDescription' },
  { label: '최소주문금액', field: 'minOrderPrice' },
  { label: '사업자번호', field: 'businessNumber' },
  { label: '전화번호', field: 'shopPhone' },
]

export const placeholders = {
  shopName: '한글 혹은 영어만 입력가능합니다.',
  shopDescription: '한글 혹은 영어만 입력가능합니다.',
  minOrderPrice: '숫자만 입력가능합니다.',
  shopPhone: '예시) 02-123-1234',
  businessNumber: '숫자만 입력가능합니다.',
  categoryName: '카테고리를 선택해주세요',
}

export const categories = [
  '한식',
  '분식',
  '카페/디저트',
  '돈까스/회/일식',
  '치킨',
  '피자',
  '아시안/양식',
  '중국집',
  '족발/보쌈',
  '야식',
]
