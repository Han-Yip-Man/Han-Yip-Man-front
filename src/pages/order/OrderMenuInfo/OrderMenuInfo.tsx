import * as S from './OrderMenuInfo.Styles'
import { useRecoilValue } from 'recoil'
import { CartStateAtom } from '../../../atoms/cartAtoms'

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
                <div>
                  {index + 1}. 메뉴이름/금액: {item.menuName} /&nbsp;
                  {item.menuPrice.toLocaleString('ko-KR')}원
                </div>
                옵션선택:
                {item.optionItems?.map((option) => (
                  <div key={option.optionItemId}>
                    {option.optionItemName} / {option.optionItemPrice.toLocaleString('ko-KR')}원
                  </div>
                ))}
                <div>수량: {item.amount}</div>
                <div>총 금액: {item.totalPrice.toLocaleString('ko-KR')}원</div>
                <hr />
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
