import * as S from './Cart.Styles'
import IconMinus from '../../assets/iconMinus.svg'
import IconPlus from '../../assets/iconPlus.svg'
import IconX from '../../assets/iconX.svg'
import { useNavigate } from 'react-router-dom'
import { Divider, Typography } from '@mui/material'

const Cart = () => {
  const navigate = useNavigate()

  return (
    <S.OuterDiv>
      <S.TopDiv>
        <S.TitleDiv>장바구니</S.TitleDiv>
      </S.TopDiv>
      <S.CustomDivider />
      <S.ListWrap>
        <S.TitleWrap>
          <S.ListTitleWrap>
            <S.CustomTypo>주문내역</S.CustomTypo>
            <S.BtnWrap>
              <S.CustomBtn>전체 삭제</S.CustomBtn>
            </S.BtnWrap>
          </S.ListTitleWrap>
          <S.SubTitleWrap>
            <S.SubTitleTypo>상품정보</S.SubTitleTypo>
            <S.SubTitleTypo>수량</S.SubTitleTypo>
            <S.SubTitleTypo>금액</S.SubTitleTypo>
          </S.SubTitleWrap>
        </S.TitleWrap>
        <S.ItemList>
          <S.ItemLi>
            <S.ItemDescWrap>
              <S.ItemImg
                alt="이미지"
                src="https://d3af5evjz6cdzs.cloudfront.net/images/uploads/800x0/salsa-roja_2e9f10fb5c8d2e95a393ad17f4064c5b1666594266.jpg"
              />
              <S.ImgTitle>페퍼로니 피자</S.ImgTitle>
            </S.ItemDescWrap>
            <S.OptionWrap>
              <S.CounterWrap>
                <S.CounterBtnWrap>
                  <S.CounterBtnMinus>-</S.CounterBtnMinus>
                  <S.CounterDisplay>0</S.CounterDisplay>
                  <S.CounterBtnPlus>+</S.CounterBtnPlus>
                </S.CounterBtnWrap>
              </S.CounterWrap>
              <S.TotalWrap>
                <S.Total>10,000원</S.Total>
              </S.TotalWrap>
            </S.OptionWrap>
          </S.ItemLi>
          <S.ItemLi>
            <S.ItemDescWrap>
              <S.ItemImg
                alt="이미지"
                src="https://d3af5evjz6cdzs.cloudfront.net/images/uploads/800x0/salsa-roja_2e9f10fb5c8d2e95a393ad17f4064c5b1666594266.jpg"
              />
              <S.ImgTitle>페퍼로니 피자</S.ImgTitle>
            </S.ItemDescWrap>
            <S.OptionWrap>
              <S.CounterWrap>
                <S.CounterBtnWrap>
                  <S.CounterBtnMinus>-</S.CounterBtnMinus>
                  <S.CounterDisplay>0</S.CounterDisplay>
                  <S.CounterBtnPlus>+</S.CounterBtnPlus>
                </S.CounterBtnWrap>
              </S.CounterWrap>
              <S.TotalWrap>
                <S.Total>10,000원</S.Total>
              </S.TotalWrap>
            </S.OptionWrap>
          </S.ItemLi>
        </S.ItemList>
      </S.ListWrap>
      <S.TotalPriceDiv>
        총 금액&nbsp;&nbsp;&nbsp;<S.Span>10,000</S.Span>원
      </S.TotalPriceDiv>
      <S.BottomDiv>
        <S.ShopGoDiv>
          <S.ShopGoButton
            onClick={() => {
              navigate('/menuDetail') // 수정 필요
            }}
          >
            메뉴 추가하기
          </S.ShopGoButton>
        </S.ShopGoDiv>
        <S.OrderDiv>
          <S.OrderButton
            onClick={() => {
              navigate('/order')
            }}
          >
            주문하기
          </S.OrderButton>
        </S.OrderDiv>
      </S.BottomDiv>
    </S.OuterDiv>
  )
}
export default Cart
