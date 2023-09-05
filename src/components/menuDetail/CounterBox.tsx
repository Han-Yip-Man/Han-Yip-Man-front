import { useState } from 'react'

import * as S from './CounterBox.Styles'

export default function CounterBox() {
  const [quantity, setQuanity] = useState(0)

  const increaseQuantity = () => {
    const newQuantity = quantity + 1
    setQuanity(newQuantity)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuanity(newQuantity)
    }
  }

  return (
    <S.Counter>
      <S.Box>
        <S.CountTitle>수량 선택</S.CountTitle>
        <S.PrcieWrapper>
          <S.PlusMinus>
            <S.MinusBox onClick={decreaseQuantity}>-</S.MinusBox>
            <S.CountNum>
              <input type="number" value={quantity} style={{ width: '30px', textAlign: 'center', fontSize: '25px' }} min="1" />
            </S.CountNum>
            <S.PlusBox onClick={increaseQuantity}>+</S.PlusBox>
          </S.PlusMinus>
        </S.PrcieWrapper>
      </S.Box>
    </S.Counter>
  )
}
