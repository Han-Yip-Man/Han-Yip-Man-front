// import { ReactNode } from 'react'
import * as S from './Options/Option.Styles'

type OptionItem = {
  optionItemId: number
  optionItemName: string
  optionItemPrice: number
}

type CustomCheckboxProps = {
  optionItem: OptionItem
  onOptionChange: (
    id: string,
    name: string,
    price: number,
    isChecked: boolean,
    optionType: string,
  ) => void
  optionType: string
  checkDuplicate: (checkbox: HTMLInputElement) => void
  checkValue: string
}

export default function CustomCheckbox({
  optionItem,
  onOptionChange,
  optionType,
  checkDuplicate,
  checkValue,
}: CustomCheckboxProps) {
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkDuplicate(event.target)

    const id = event.target.id
    const price = parseInt(event.target.value)
    const name = event.target.name
    const isChecked = event.target.checked

    onOptionChange(id, name, price, isChecked, optionType) // 체크 여부와 옵션 타입 추가해서 전달
  }

  return (
    <>
      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id={`option-${optionItem.optionItemId}`}
          name={optionType}
          value={optionItem.optionItemPrice}
          checked={+checkValue === optionItem.optionItemPrice}
          onChange={handleCheckChange}
        />
        <S.OptionOneLabel htmlFor={optionItem.optionItemName}>
          <div>{optionItem.optionItemName}</div>
          <div>+{optionItem.optionItemPrice}원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>
    </>
  )
}
