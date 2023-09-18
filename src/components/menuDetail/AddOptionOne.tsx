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
}

export default function AddOptionOne({
  option,
  onOptionChange,
}: AddOptionOneProps & {
  onOptionChange: (
    id: string,
    name: string,
    price: number,
    isChecked: boolean,
    optionType: string,
  ) => void
}) {
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id
    const price = parseInt(event.target.value)
    const name = event.target.name
    const isChecked = event.target.checked

    onOptionChange(id, name, price, isChecked, option.optionName) // 체크 여부와 옵션 타입 추가해서 전달
  }

  return (
    <S.OptionWrapper>
      <S.OptionTitle>{option.optionName}</S.OptionTitle>
      {option.optionItems.map((item) => (
        <S.CheckboxWrapper key={item.optionItemId}>
          <S.OptionOneInput
            type="checkbox"
            id={`option-${item.optionItemId}`}
            name={item.optionItemName}
            value={item.optionItemPrice}
            onChange={handleCheckChange}
          />
          <S.OptionOneLabel
            htmlFor={`option-${item.optionItemId}`}
            style={
              {
                // color: isChecked.option1 ? 'blue' : 'black',
              }
            }
          >
            <div>{item.optionItemName}</div>
            <div>+{item.optionItemPrice}원</div>
          </S.OptionOneLabel>
        </S.CheckboxWrapper>
      ))}
    </S.OptionWrapper>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
