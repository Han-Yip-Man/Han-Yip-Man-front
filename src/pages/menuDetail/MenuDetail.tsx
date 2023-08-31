import * as S from '@/pages/Domino/MenuDetail.Styles'

const MenuDetail = () => {
  return (
    <>
      <S.WrapperDiv>
        <S.FixedDiv>
          <S.Img alt="sample_img" src="https://cdn.dominos.co.kr/admin/upload/goods/20230619_hybtjkBv.jpg" />
        </S.FixedDiv>

        <S.OptionDiv>
          <S.MenuInfoDiv>
            <S.MenuNameDiv>아보카도 새우</S.MenuNameDiv>
            <S.MenuExpDiv>#슈퍼시드 화이버 함유 도우로 더 맛있게!</S.MenuExpDiv>
          </S.MenuInfoDiv>

          <S.SuperPayBox>
            <S.SuperPayTitleDiv>
              <S.SuperPay>슈퍼 페이</S.SuperPay>
              <S.ChargeButton>충전하기</S.ChargeButton>
            </S.SuperPayTitleDiv>
            <S.OrderPriceContentDiv>
              <S.SuperPayTextDiv>
                <S.Text1>보유 금액</S.Text1>
                <S.Text2>사용 금액</S.Text2>
              </S.SuperPayTextDiv>
              <S.SuperPayNumberDiv>
                <S.Price1>25,000원</S.Price1>
                <S.Price2>-25,000원</S.Price2>
              </S.SuperPayNumberDiv>
            </S.OrderPriceContentDiv>
            <S.OrderPriceHr />
          </S.SuperPayBox>

          <S.AgreeBox>
            <S.SubAgree>
              <S.SubAgreeInput></S.SubAgreeInput>
              <S.SubAgreeDiv>구매조건 확인 및 결제진행에 동의</S.SubAgreeDiv>
            </S.SubAgree>
          </S.AgreeBox>
        </S.OptionDiv>
      </S.WrapperDiv>
    </>
  )
}

export default MenuDetail
