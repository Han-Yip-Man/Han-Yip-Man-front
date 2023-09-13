import * as S from './Option.Styles'

export default function AddOptionTwo() {
  return (
    <>
      <S.OptionTitle>소스 추가 선택 ( n개 중복 선택 가능)</S.OptionTitle>
      <div>
        <S.Input type="checkbox" id="small" name="small" checked />
        <S.MidLabel htmlFor="small">핫소스</S.MidLabel>
        <S.Span>+2,000원</S.Span>
      </div>

      <div>
        <S.Input type="checkbox" id="medium" name="medium" />
        <S.MidLabel htmlFor="medium">갈릭 디핑 소스</S.MidLabel>
        <S.Span>+2,000원</S.Span>
      </div>

      <div>
        <S.Input type="checkbox" id="large" name="large" />
        <S.LargeLabel htmlFor="large">매운 치킨 소스</S.LargeLabel>
        <S.Span>+5,000원</S.Span>
      </div>

      <div>
        <S.Input type="checkbox" id="large" name="large" />
        <S.LargeLabel htmlFor="large">스윗 칠리 소스</S.LargeLabel>
        <S.Span>+5,000원</S.Span>
      </div>

      <div>
        <S.Input type="checkbox" id="large" name="large" />
        <S.LargeLabel htmlFor="large">마라 소스</S.LargeLabel>
        <S.Span>+5,000원</S.Span>
      </div>
    </>
  )
}

// [label 의 htmlFor 속성 = input 의 id 속성] 으로 연결

// div 로 해서 space-between 으로 바꾸기
