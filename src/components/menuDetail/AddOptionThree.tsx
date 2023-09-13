import * as S from './Option.Styles'

export default function AddOptionThree() {
  return (
    <>
      <S.OptionTitle>음료 추가 선택</S.OptionTitle>
      <div>
        <S.Input type="checkbox" id="small" name="small" checked />
        <S.MidLabel htmlFor="small">Small</S.MidLabel>
      </div>

      <div>
        <S.Input type="checkbox" id="medium" name="medium" />
        <S.MidLabel htmlFor="medium">Medium</S.MidLabel>
        <S.Span>+2,000원</S.Span>
      </div>

      <div>
        <S.Input type="checkbox" id="large" name="large" />
        <S.LargeLabel htmlFor="large">Large</S.LargeLabel>
        <S.Span>+5,000원</S.Span>
      </div>
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
