import { useState } from 'react'
import * as S from './Option.Styles'
// import useAlert from '../../hooks/useAlert'

type Option = 'sauce1' | 'sauce2' | 'sauce3' | 'sauce4' | 'sauce5'

export default function AddOptionTwo() {
  // const handleAlert = useAlert()

  const [isChecked, setIsChecked] = useState<Record<Option, boolean>>({
    sauce1: false,
    sauce2: false,
    sauce3: false,
    sauce4: false,
    sauce5: false,
  })

  const handleCheckChange = (option: Option) => {
    // Object.values() 메서드 : 객체의 모든 속성 값들을 "배열"로 반환
    // Boolean 생성자 함수 : JavaScript에서 "참"으로 평가되는 값을 "필터링"
    const checkedCount = Object.values(isChecked).filter(Boolean).length

    if (checkedCount === 3 && !isChecked[option]) {
      // handleAlert('소스는 최대 3개까지만 선택이 가능합니다.', 1000, 'success')
      alert('소스는 최대 3개까지만 선택이 가능합니다.')
      return
    }

    setIsChecked((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }))
  }
  return (
    <>
      <S.OptionTitle>소스 추가 선택 (최대 3개 중복 선택 가능)</S.OptionTitle>
      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id="sauce1"
          name="sauce1"
          checked={isChecked.sauce1}
          onChange={() => handleCheckChange('sauce1')}
        />
        <S.OptionOneLabel
          htmlFor="sauce1"
          style={{
            color: isChecked.sauce1 ? 'blue' : 'black',
            fontWeight: isChecked.sauce1 ? 'bold' : 'lighter',
          }}
        >
          <div>핫소스</div>
          <div>+500원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id="sauce2"
          name="sauce2"
          checked={isChecked.sauce2}
          onChange={() => handleCheckChange('sauce2')}
        />
        <S.OptionOneLabel
          htmlFor="sauce2"
          style={{
            color: isChecked.sauce2 ? 'blue' : 'black',
            fontWeight: isChecked.sauce2 ? 'bold' : 'lighter',
          }}
        >
          <div>갈릭 디핑 소스</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id="sauce3"
          name="sauce3"
          checked={isChecked.sauce3}
          onChange={() => handleCheckChange('sauce3')}
        />
        <S.OptionOneLabel
          htmlFor="sauce3"
          style={{
            color: isChecked.sauce3 ? 'blue' : 'black',
            fontWeight: isChecked.sauce3 ? 'bold' : 'lighter',
          }}
        >
          <div>매운 치킨 소스</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id="sauce4"
          name="sauce4"
          checked={isChecked.sauce4}
          onChange={() => handleCheckChange('sauce4')}
        />
        <S.OptionOneLabel
          htmlFor="sauce4"
          style={{
            color: isChecked.sauce4 ? 'blue' : 'black',
            fontWeight: isChecked.sauce4 ? 'bold' : 'lighter',
          }}
        >
          <div>스윗 칠리 소스</div>
          <div>+1,000원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>

      <S.CheckboxWrapper>
        <S.OptionOneInput
          type="checkbox"
          id="sauce5"
          name="sauce5"
          checked={isChecked.sauce5}
          onChange={() => handleCheckChange('sauce5')}
        />
        <S.OptionOneLabel
          htmlFor="sauce5"
          style={{
            color: isChecked.sauce5 ? 'blue' : 'black',
            fontWeight: isChecked.sauce5 ? 'bold' : 'lighter',
          }}
        >
          <div>마라 소스</div>
          <div>+1,500원</div>
        </S.OptionOneLabel>
      </S.CheckboxWrapper>
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
