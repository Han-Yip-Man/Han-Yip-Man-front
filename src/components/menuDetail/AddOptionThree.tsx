import { useState } from 'react'
import * as S from './Option.Styles'

type Option = 'drink1' | 'drink2' | 'drink3'
export default function AddOptionThree() {
  const [isChecked, setIsChecked] = useState<Record<Option, boolean>>({
    drink1: false,
    drink2: false,
    drink3: false,
  })

  const handleCheckChange = (option: Option) => {
    setIsChecked({ drink1: false, drink2: false, drink3: false, [option]: true })
  }

  return (
    <>
      <S.OptionTitle>음료 추가 선택</S.OptionTitle>
      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id="drink1"
          name="drink1"
          checked={isChecked.drink1}
          onChange={() => handleCheckChange('drink1')}
        />
        <S.OptionOneLabel
          htmlFor="drink1"
          style={{
            color: isChecked.drink1 ? 'blue' : 'black',
            fontWeight: isChecked.drink1 ? 'bold' : 'lighter',
          }}
        >
          <div>콜라</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id="drink2"
          name="drink2"
          checked={isChecked.drink2}
          onChange={() => handleCheckChange('drink2')}
        />
        <S.OptionOneLabel
          htmlFor="drink2"
          style={{
            color: isChecked.drink2 ? 'blue' : 'black',
            fontWeight: isChecked.drink2 ? 'bold' : 'lighter',
          }}
        >
          <div>사이다</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id="drink3"
          name="drink3"
          checked={isChecked.drink3}
          onChange={() => handleCheckChange('drink3')}
        />
        <S.OptionOneLabel
          htmlFor="drink3"
          style={{
            color: isChecked.drink3 ? 'blue' : 'black',
            fontWeight: isChecked.drink3 ? 'bold' : 'lighter',
          }}
        >
          <div>웰치스</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
