import * as S from './Option.Styles'
// import useAlert from '../../hooks/useAlert'

interface OptionItem {
  optionItemId: number
  optionItemName: string
  optionItemPrice: number
}

interface Option {
  optionId: number
  optionName: string
  isMultiple: boolean
  maxSelected: number
  optionItems: OptionItem[]
}

interface AddOptionOneProps {
  option: Option
  selectedOptions: {
    [key: string]: { optionItemId: number; optionItemName: string; optionItemPrice: number }[]
  }
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<{
      [key: string]: { optionItemId: number; optionItemName: string; optionItemPrice: number }[]
    }>
  >
}

export default function AddOptionOne({
  option,
  onOptionChange,
  selectedOptions,
}: AddOptionOneProps & {
  onOptionChange: (
    id: number,
    name: string,
    price: number,
    isChecked: boolean,
    optionType: string,
  ) => void
}) {
  const handleCheckChange = (event: React.MouseEvent<HTMLInputElement>) => {
    const checkbox = event.target as HTMLInputElement
    const idStr = checkbox.id.split('-')[1]
    const id = parseInt(idStr)
    const name = checkbox.name
    const price = parseInt(checkbox.value)
    const isChecked = checkbox.checked

    // 선택 가능한 최대 개수를 초과했는지 확인
    if (isChecked && selectedOptions[option.optionName]?.length >= option.maxSelected) {
      // 이벤트 취소 (체크박스가 체크되지 않도록 함)
      event.preventDefault()
      return
    }

    onOptionChange(id, name, price, isChecked, option.optionName)
  }

  return (
    <S.OptionWrapper>
      <S.TitleAndMaxWrapper>
        <S.OptionTitle>{option.optionName}</S.OptionTitle>
        <S.OptionMaxSeleted>최대 {option.maxSelected}개 선택</S.OptionMaxSeleted>
      </S.TitleAndMaxWrapper>

      {option.optionItems.map((item) => {
        // const selectedCount = selectedOptions[option.optionName]?.length || 0

        return (
          <S.CheckboxWrapper key={item.optionItemId}>
            <S.OptionOneInput
              type="checkbox"
              id={`option-${item.optionItemId}`}
              name={item.optionItemName}
              value={item.optionItemPrice}
              checked={(selectedOptions[option.optionName] || []).some(
                (i) => i.optionItemName === item.optionItemName,
              )}
              // disabled={!option.isMultiple || selectedCount >= option.maxSelected}
              // onChange={handleCheckChange}
              onClick={handleCheckChange}
              onDoubleClick={handleCheckChange}
            />
            <S.OptionOneLabel htmlFor={`option-${item.optionItemId}`}>
              <S.OptNameAndPriceWrap>
                <S.OptionItemNameDiv>{item.optionItemName}</S.OptionItemNameDiv>
                <S.OptionItemPrice>
                  +{item.optionItemPrice.toLocaleString('ko-KR')}원
                </S.OptionItemPrice>
              </S.OptNameAndPriceWrap>
            </S.OptionOneLabel>
          </S.CheckboxWrapper>
        )
      })}
    </S.OptionWrapper>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
