import { useRecoilState, useRecoilValue } from 'recoil'
import * as S from './TotalPriceInfo.Styles'
import { totalCartPriceSelector } from '../../../atoms/cartAtoms'
import { CouponDiscountAtom, FinalChargePriceAtom } from '../../../atoms/orderAtoms'
import { useEffect } from 'react'

const TotalPriceInfo = () => {
  const totalCartPrice = useRecoilValue(totalCartPriceSelector)
  const couponDiscount = useRecoilValue(CouponDiscountAtom)
  const [finalChargePrice, setFinalChargePrice] = useRecoilState(FinalChargePriceAtom)

  useEffect(() => {
    const finalCharge = totalCartPrice - couponDiscount.discountPrice + 2000
    setFinalChargePrice(finalCharge)
  }, [totalCartPrice, couponDiscount])

  return (
    <S.OuterDiv>
      <S.ItemTable>
        <S.Title>
          <S.Td1Title>최종 결제 금액</S.Td1Title>
        </S.Title>
        <S.Thead>
          <S.Td1>
            <S.Td1InnerDiv>
              <S.FirstDiv>
                <S.FirstTextDiv>총 상품 금액</S.FirstTextDiv>
                <S.FirstPriceDiv>
                  {totalCartPrice.toLocaleString('ko-KR')}
                  <S.WonSpan>원</S.WonSpan>
                </S.FirstPriceDiv>
              </S.FirstDiv>
              <S.MinusDiv>-</S.MinusDiv>
              <S.SecondDiv>
                <S.SecondTextDiv>총 할인 금액</S.SecondTextDiv>
                <S.SecondPriceDiv>
                  {couponDiscount.discountPrice.toLocaleString('ko-KR')}
                  <S.WonSpan>원</S.WonSpan>
                </S.SecondPriceDiv>
              </S.SecondDiv>
              <S.PlusDiv>+</S.PlusDiv>
              <S.ThirdDiv>
                <S.ThirdTextDiv>배달비</S.ThirdTextDiv>
                <S.ThirdPriceDiv>
                  2,000
                  <S.WonSpan>원</S.WonSpan>
                </S.ThirdPriceDiv>
              </S.ThirdDiv>
              <S.EqualDiv>=</S.EqualDiv>
              <S.FourthDiv>
                <S.FourthTextDiv>총 결제 금액</S.FourthTextDiv>
                <S.FourthPriceDiv>
                  {finalChargePrice.toLocaleString('ko-KR')}
                  <S.WonSpan>원</S.WonSpan>
                </S.FourthPriceDiv>
              </S.FourthDiv>
            </S.Td1InnerDiv>
          </S.Td1>
        </S.Thead>
      </S.ItemTable>
    </S.OuterDiv>
  )
}
export default TotalPriceInfo
