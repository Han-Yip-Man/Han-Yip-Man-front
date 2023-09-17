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
  onOptionChange: (name: string, price: number, isChecked: boolean, optionType: string) => void
}) {
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(event.target.value)
    const name = event.target.name
    const isChecked = event.target.checked

    onOptionChange(name, price, isChecked, option.optionName) // 체크 여부와 옵션 타입 추가해서 전달
  }

  return (
    <>
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
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결

// <S.CheckboxWrapper>
// <S.OptionOneInput
//   type="checkbox"
//   id="option2"
//   name="option2"
//   checked={isChecked.option2}
//   onChange={() => handleCheckChange('option2')}
// />
// <S.OptionOneLabel
//   htmlFor="option2"
//   style={{
//     color: isChecked.option2 ? 'blue' : 'black',
//     fontWeight: isChecked.option2 ? 'bold' : 'lighter',
//   }}
// >
//   <div>감자튀김</div>
//   <div>+2,000원</div>
// </S.OptionOneLabel>
// </S.CheckboxWrapper>

// <S.CheckboxWrapper>
// <S.OptionOneInput
//   type="checkbox"
//   id="option3"
//   name="option3"
//   checked={isChecked.option3}
//   onChange={() => handleCheckChange('option3')}
// />
// <S.OptionOneLabel
//   htmlFor="option3"
//   style={{
//     color: isChecked.option3 ? 'blue' : 'black',
//     fontWeight: isChecked.option3 ? 'bold' : 'lighter',
//   }}
// >
//   <div>핫도그</div>
//   <div>+3,000원</div>
// </S.OptionOneLabel>
// </S.CheckboxWrapper>

// <S.CheckboxWrapper>
// <S.OptionOneInput
//   type="checkbox"
//   id="option4"
//   name="option4"
//   checked={isChecked.option4}
//   onChange={() => handleCheckChange('option4')}
// />
// <S.OptionOneLabel
//   htmlFor="option4"
//   style={{
//     color: isChecked.option4 ? 'blue' : 'black',
//     fontWeight: isChecked.option4 ? 'bold' : 'lighter',
//   }}
// >
//   <div>코울슬로</div>
//   <div>+2,000원</div>
// </S.OptionOneLabel>
// </S.CheckboxWrapper>

// <S.CheckboxWrapper>
// <S.OptionOneInput
//   type="checkbox"
//   id="option5"
//   name="option5"
//   checked={isChecked.option5}
//   onChange={() => handleCheckChange('option5')}
// />
// <S.OptionOneLabel
//   htmlFor="option5"
//   style={{
//     color: isChecked.option5 ? 'blue' : 'black',
//     fontWeight: isChecked.option5 ? 'bold' : 'lighter',
//   }}
// >
//   <div>고구마튀김</div>
//   <div>+3,000원</div>
// </S.OptionOneLabel>
// </S.CheckboxWrapper>
