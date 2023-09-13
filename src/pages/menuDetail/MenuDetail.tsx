import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as S from './MenuDetail.Styles'
import CounterBox from '../../components/menuDetail/CounterBox'
import SizeOption from '../../components/menuDetail/SizeOption'
import AddOptionOne from '../../components/menuDetail/AddOptionOne'
import AddOptionTwo from '../../components/menuDetail/AddOptionTwo'
import AddOptionThree from '../../components/menuDetail/AddOptionThree'

// MenuData의 타입 정의
// interface MenuData {
//   menuId: number
//   menuPrice: number
//   menuName: string
//   menuDescription: string
// }

const MenuDetail = () => {
  const navigate = useNavigate()
  // const [data, setData] = useState<MenuData>({
  //   menuId: 1,
  //   menuPrice: 27000,
  //   menuName: '',
  //   menuDescription: '',
  // })

  const [quantity, setQuantity] = useState<number>(1)

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
              {/* <S.MenuPriceDiv> {data.menuPrice.toLocaleString('ko-KR')}원</S.MenuPriceDiv> */}
            </S.MenuInfoDiv>

            <S.OptionBox>
              <SizeOption />
            </S.OptionBox>

            <S.OptionBox>
              <AddOptionOne />
            </S.OptionBox>

            <S.OptionBox>
              <AddOptionTwo />
            </S.OptionBox>

            <S.OptionBox>
              <AddOptionThree />
            </S.OptionBox>

            <S.OptionBox>
              <CounterBox quantity={quantity} setQuantity={setQuantity} />
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
              {/* <S.TotalPriceDiv>총 금액 {(data.menuPrice * quantity).toLocaleString('ko-KR')}원</S.TotalPriceDiv> */}
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
