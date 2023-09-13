import * as S from './Option.Styles'

export default function AddOptionOne() {
  return (
    <>
      <S.OptionTitle>사이드 추가 선택</S.OptionTitle>
      <form>
        <S.Li className="checkbox">
          <S.Input type="checkbox" />
          <S.LabelOne></S.LabelOne>
          <S.Span></S.Span>
        </S.Li>
        <button type="submit">submit</button>
      </form>
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결
