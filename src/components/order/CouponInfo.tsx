import useRouter from '../../hooks/useRouter'
import * as S from './CouponInfo.Styles'
import CouponModal from './CouponModal'

const CouponInfo = () => {
  const { routeTo } = useRouter()

  return (
    <S.OuterDiv>
      <S.ItemTable>
        <S.Title>
          <S.Td1Title>쿠폰 적용</S.Td1Title>
        </S.Title>
        <S.Thead>
          <S.Td1>
            <S.Td1InnerDiv>
              <CouponModal
                title="쿠폰 번호 조회하기"
                content="input 칸?"
                onConfirm={() => {
                  routeTo('/order')
                }}
              />
            </S.Td1InnerDiv>
          </S.Td1>
        </S.Thead>
      </S.ItemTable>
    </S.OuterDiv>
  )
}
export default CouponInfo
