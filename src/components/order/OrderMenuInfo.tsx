import * as S from './OrderMenuInfo.Styles'

const OrderMenuInfo = () => {
  return (
    <S.OuterDiv>
      <S.ItemTable>
        <S.Title>
          <S.Td1Title>주문 내역</S.Td1Title>
        </S.Title>
        <S.Thead>
          <S.Td1>
            <S.Td1InnerDiv>페퍼로니 피자/L x 1</S.Td1InnerDiv>
          </S.Td1>
        </S.Thead>
      </S.ItemTable>
    </S.OuterDiv>
  )
}
export default OrderMenuInfo
