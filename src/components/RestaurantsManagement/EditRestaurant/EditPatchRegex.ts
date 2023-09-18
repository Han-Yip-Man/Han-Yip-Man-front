import { FieldNames } from '../../../types/restaurantsAtom'

const regexPatterns: { [key: string]: RegExp } = {
  shopName: /^[A-Za-z가-힣\s]+$/,
  shopDescription: /^[A-Za-z가-힣\s]+$/,
  minOrderPrice: /^[0-9]+$/,
  shopPhone: /^\d{2,3}-\d{3,4}-\d{4}$/,
  businessNumber: /^\d{10}$/,
  categoryName: /^[0-9]+$/,
}

export const validateField = (field: FieldNames, value: string | number) => {
  const pattern = regexPatterns[field]
  if (pattern) {
    return pattern.test(String(value))
  } else {
    throw new Error(`정규식 패턴이 정의되지 않은 필드입니다: ${field}`)
  }
}
