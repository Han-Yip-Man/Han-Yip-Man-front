import { useState } from 'react'
import * as S from './Option.Styles'

type Size = 'small' | 'medium' | 'large'

export default function SizeOption() {
  const [isChecked, setIsChecked] = useState<Record<Size, boolean>>({
    small: false,
    medium: false,
    large: false,
  })

  const handleCheckChange = (size: Size) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [size]: !prevState[size],
    }))
  }
  return (
    <>
      <S.OptionTitle>사이즈 선택</S.OptionTitle>
      <S.CheckboxWrapper>
        <S.Input type="checkbox" id="small" name="small" checked={isChecked.small} onChange={() => handleCheckChange('small')} />
        <S.MidLabel htmlFor="small" style={{ color: isChecked.small ? 'blue' : 'black', fontWeight: isChecked.small ? 'bold' : 'lighter' }}>
          <div>Small</div>
          <div></div>
        </S.MidLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.Input type="checkbox" id="medium" name="medium" checked={isChecked.medium} onChange={() => handleCheckChange('medium')} />
        <S.MidLabel htmlFor="medium" style={{ color: isChecked.medium ? 'blue' : 'black', fontWeight: isChecked.medium ? 'bold' : 'lighter' }}>
          <div>Medium</div>
          <div>+2,000원</div>
        </S.MidLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.Input type="checkbox" id="large" name="large" checked={isChecked.large} onChange={() => handleCheckChange('large')} />
        <S.LargeLabel htmlFor="large" style={{ color: isChecked.large ? 'blue' : 'black', fontWeight: isChecked.large ? 'bold' : 'lighter' }}>
          <div>Large</div>
          <div>+5,000원</div>
        </S.LargeLabel>
      </S.CheckboxWrapper>
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
