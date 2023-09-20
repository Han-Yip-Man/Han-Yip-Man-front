import * as S from './OrderMenuInfo.Styles'
import { useRecoilValue } from 'recoil'
import { CartStateAtom } from '../../atoms/cartAtoms'

const OrderMenuInfo = () => {
  const cartProduct = useRecoilValue(CartStateAtom)

  return (
    <S.OuterDiv>
      <S.ItemTable>
        <S.Title>
          <S.Td1Title>주문 내역</S.Td1Title>
        </S.Title>
        <S.Thead>
          <S.Td1>
            {cartProduct.map((item, index) => (
              <S.Td1InnerDiv key={index}>
                {/* 아이템 정보 출력 */}
                메뉴 이름: {item.menuName}
                <br />
                메뉴 가격: {item.menuPrice.toLocaleString('ko-KR')}원<br />
                수량: {item.amount}
                <br />총 가격: {item.totalPrice.toLocaleString('ko-KR')}원
                <hr />
              </S.Td1InnerDiv>
            ))}
          </S.Td1>
        </S.Thead>
      </S.ItemTable>
    </S.OuterDiv>
  )
}
export default OrderMenuInfo
