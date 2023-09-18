import { useState } from 'react'
import * as S from './Option.Styles'
import CustomCheckbox from './CustomCheckbox'

interface OptionItem {
  optionItemId: number
  optionItemName: string
  optionItemPrice: number
}

interface OptionValue {
  optionId: number
  optionName: string
  isMultiple: boolean
  maxSelected: number
  optionItems: OptionItem[]
}

type AddOptionThreeProps = {
  optionValue: OptionValue
  onOptionChange: (
    id: string,
    name: string,
    price: number,
    isChecked: boolean,
    optionType: string,
  ) => void
}

export default function AddOptionThree({ optionValue, onOptionChange }: AddOptionThreeProps) {
  const [checkValue, setCheckValue] = useState('')

  const checkDuplicate = (checkbox: HTMLInputElement) => {
    if (!checkbox.checked) {
      checkbox.checked = false
      setCheckValue('')
    } else {
      const checkItem = document.getElementsByName(optionValue.optionName)
      Array.prototype.forEach.call(checkItem, function (el) {
        el.checked = false
      })
      checkbox.checked = true
      setCheckValue(checkbox.defaultValue)
    }
  }

  return (
    <>
      <S.OptionTitle>{optionValue.optionName} 추가 선택</S.OptionTitle>
      {optionValue.optionItems.map((optionItem) => (
        <CustomCheckbox
          key={optionItem.optionItemId}
          optionItem={optionItem}
          optionType={optionValue.optionName}
          onOptionChange={onOptionChange}
          checkDuplicate={checkDuplicate}
          checkValue={checkValue}
        />
      ))}
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
