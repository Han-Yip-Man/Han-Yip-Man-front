import { useNavigate } from 'react-router-dom'
import CounterBox from '../../components/menuDetail/CounterBox'
import MainDishRadio from '../../components/menuDetail/MainDishRadio'
import SideDishOneRadio from '../../components/menuDetail/SideDishOneRadio'
import SideDishTwoRadio from '../../components/menuDetail/SideDishTwoRadio'
import * as S from './MenuDetail.Styles'

const MenuDetail = () => {
  const navigate = useNavigate()

  return (
    <>
      <S.WrapperDiv>
        <S.MainWrapperDiv>
          <S.FixedDiv>
            <S.Img alt="sample_img" src="https://cdn.dominos.co.kr/admin/upload/goods/20230619_hybtjkBv.jpg" />
          </S.FixedDiv>

          <S.OptionDiv>
            <S.MenuInfoDiv>
              <S.MenuNameDiv>아보카도 새우</S.MenuNameDiv>
              <S.MenuExpDiv>#슈퍼시드 화이버 함유 도우로 더 맛있게!</S.MenuExpDiv>
            </S.MenuInfoDiv>

            <S.OptionBox>
              <MainDishRadio />
            </S.OptionBox>

            <S.OptionBox>
              <SideDishOneRadio />
            </S.OptionBox>

            <S.OptionBox>
              <SideDishTwoRadio />
            </S.OptionBox>

            <S.OptionBox>
              <CounterBox />
            </S.OptionBox>
          </S.OptionDiv>
        </S.MainWrapperDiv>

        <S.BottomDiv>
          <S.MainOuterDiv>
            <S.MainDiv>
              <S.TitleDiv>메인</S.TitleDiv>
              <S.PickedMenuDiv>아보카도 새우/L(39,000원)</S.PickedMenuDiv>
            </S.MainDiv>
            <S.MainDiv>
              <S.TitleDiv>사이드</S.TitleDiv>
              <S.PickedMenuDiv>맥앤치즈 볼 콤보(+7,400원)</S.PickedMenuDiv>
            </S.MainDiv>
            <S.MainDiv>
              <S.TitleDiv>음료&기타</S.TitleDiv>
              <S.PickedMenuDiv>코카콜라 1.25L(+2,300원)</S.PickedMenuDiv>
            </S.MainDiv>
            <S.MainDiv>
              <S.TotalPriceDiv>총 금액</S.TotalPriceDiv>
              <S.OrderButton
                onClick={() => {
                  navigate('/cart')
                }}
              >
                주문하기
              </S.OrderButton>
            </S.MainDiv>
          </S.MainOuterDiv>
        </S.BottomDiv>
      </S.WrapperDiv>
    </>
  )
}

export default MenuDetail
