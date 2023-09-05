import * as S from './Cart.Styles'
import IconMinus from '../../assets/iconMinus.svg'
import IconPlus from '../../assets/iconPlus.svg'
import IconX from '../../assets/iconX.svg'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()

  return (
    <S.OuterDiv>
      <S.TopDiv>
        <S.TitleDiv>장바구니</S.TitleDiv>
      </S.TopDiv>
      <S.ItemTable>
        <S.Title>
          <S.Td1Title>주문내역</S.Td1Title>
          <S.Td2></S.Td2>
          <S.Td3></S.Td3>
          <S.Td4Title>전체 삭제</S.Td4Title>
        </S.Title>
        <S.Thead>
          <S.Td1>상품 정보</S.Td1>
          <S.Td2>수량</S.Td2>
          <S.Td3>금액</S.Td3>
          <S.Td4></S.Td4>
        </S.Thead>
        <S.Tr>
          <S.ProductDiv>
            <S.Img alt="sample_img" src="https://cdn.dominos.co.kr/admin/upload/goods/20230619_hybtjkBv.jpg" />
            <S.ProductNameDiv>페퍼로니 피자</S.ProductNameDiv>
          </S.ProductDiv>
          <S.Td2>
            <S.CounterOuterDiv>
              <S.CountDiv>
                <S.MinusButton>
                  <S.MinusPlusImg src={IconMinus} />
                </S.MinusButton>
                <S.CountInput value="1" />
                <S.PlusButton>
                  <S.MinusPlusImg src={IconPlus} />
                </S.PlusButton>
              </S.CountDiv>
            </S.CounterOuterDiv>
          </S.Td2>
          <S.Td3>10원</S.Td3>
          <S.Td4>
            <S.XImg src={IconX} />
          </S.Td4>
        </S.Tr>
      </S.ItemTable>
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
