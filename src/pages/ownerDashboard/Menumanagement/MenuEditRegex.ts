import { MenuField } from '../../../types/restaurantsAtom'

const menuregexPatterns: { [key: string]: RegExp } = {
  menuName: /^[A-Za-z가-힣\s]+$/,
  menuDescription: /^[A-Za-z가-힣\s]+$/,
  menuPrice: /^[0-9]+$/,
  categorygroups: /^[0-9]+$/,
}

export const menuvalidateField = (field: MenuField, value: string | number) => {
  const pattern = menuregexPatterns[field]
  if (pattern) {
    return pattern.test(String(value))
  } else {
    throw new Error(`정규식 패턴이 정의되지 않은 필드입니다: ${field}`)
  }
}
