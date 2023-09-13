import { useState } from 'react'
import * as S from './Option.Styles'

type Option = 'sauce1' | 'sauce2' | 'sauce3' | 'sauce4' | 'sauce5'

export default function AddOptionTwo() {
  const [isChecked, setIsChecked] = useState<Record<Option, boolean>>({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  })

  const handleCheckChange = (option: Option) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }))
  }
  return (
    <>
      <S.OptionTitle>소스 추가 선택 ( n개 중복 선택 가능)</S.OptionTitle>
      <S.CheckboxWrapper>
        <S.OptionOneInput type="checkbox" id="option1" name="option1" checked={isChecked.option1} onChange={() => handleCheckChange('option1')} />
        <S.OptionOneLabel htmlFor="option1" style={{ color: isChecked.option1 ? 'blue' : 'black', fontWeight: isChecked.option1 ? 'bold' : 'lighter' }}>
          <div>핫소스</div>
          <div>+500원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput type="checkbox" id="option2" name="option2" checked={isChecked.option2} onChange={() => handleCheckChange('option2')} />
        <S.OptionOneLabel htmlFor="option2" style={{ color: isChecked.option2 ? 'blue' : 'black', fontWeight: isChecked.option2 ? 'bold' : 'lighter' }}>
          <div>갈릭 디핑 소스</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput type="checkbox" id="option3" name="option3" checked={isChecked.option3} onChange={() => handleCheckChange('option3')} />
        <S.OptionOneLabel htmlFor="option3" style={{ color: isChecked.option3 ? 'blue' : 'black', fontWeight: isChecked.option3 ? 'bold' : 'lighter' }}>
          <div>매운 치킨 소스</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput type="checkbox" id="option4" name="option4" checked={isChecked.option4} onChange={() => handleCheckChange('option4')} />
        <S.OptionOneLabel htmlFor="option4" style={{ color: isChecked.option4 ? 'blue' : 'black', fontWeight: isChecked.option4 ? 'bold' : 'lighter' }}>
          <div>스윗 칠리 소스</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput type="checkbox" id="option5" name="option5" checked={isChecked.option5} onChange={() => handleCheckChange('option5')} />
        <S.OptionOneLabel htmlFor="option5" style={{ color: isChecked.option5 ? 'blue' : 'black', fontWeight: isChecked.option5 ? 'bold' : 'lighter' }}>
          <div>마라 소스</div>
          <div>+1,500원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
