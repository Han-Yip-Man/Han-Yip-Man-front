import * as S from './CouponModal.Styles'
import { useEffect, useRef, useState } from 'react'
import { getMyCounpon } from '../../../api/coupon'
import { registerCoupon } from '../../../api/coupon'
import PositionedSnackbar from '../../order/PositionedSnackbar'
import Ximg from '../../../assets/iconX.svg'
import { useRecoilState } from 'recoil'
import { CouponDiscountAtom } from '../../../atoms/orderAtoms'

type ModalProps = {
  title?: string // 모달창 제목을 Prop으로 받을 수 있다.
  content?: string // 모달창 컨텐츠를 Prop으로 받을 수 있다.
  onConfirm?: () => void // 모달창의 확인 버튼 클릭시, 실행할 함수를 Prop으로 받을 수 있다.
}

type MyCouponList = {
  buyerCouponId: number
  couponCode: string
  couponId: number
  createdAt: string
  discountPrice: number
  enabled: boolean
}

export default function CouponModal({ title, content, onConfirm }: ModalProps) {
  // dialog 참조 ref
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const couponCodeRef = useRef<HTMLInputElement>(null)
  const initialCouponListData: MyCouponList[] = []

  const [couponList, setCouponList] = useState<MyCouponList[]>([])
  const [selectedCouponDiscount, setSelectedCouponDiscount] = useRecoilState(CouponDiscountAtom)
  const [tempDiscount, setTempDiscount] = useState({ discountPrice: 0, buyerCouponId: 0 })

  // modal 오픈 함수
  const showModal = () => {
    dialogRef.current?.showModal() // 모달창 노출. show() 호출하면 다이얼로그 노출
    getMyCounpon().then((response: MyCouponList[]) => {
      setCouponList(response)
    })
  }

  // Modal 닫기 함수
  const closeModal = () => {
    dialogRef.current?.close() // 모달창 닫기
  }

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    discountPrice: number,
    buyerCouponId: number,
  ) => {
    setIsChecked(event.target.checked)
    if (event.target.checked) {
      setTempDiscount({ discountPrice, buyerCouponId })
    } else {
      setTempDiscount({ discountPrice: 0, buyerCouponId: 0 })
    }
  }

  const couponRegisterHandler = () => {
    if (couponCodeRef.current) {
      const code = {
        couponCode: couponCodeRef.current.value,
      }
      registerCoupon(code)
    }
  }

  const onConfirmHandler = () => {
    setSelectedCouponDiscount({
      discountPrice: tempDiscount.discountPrice,
      buyerCouponId: tempDiscount.buyerCouponId,
    })

    closeModal()
  }

  //모달 닫기 이벤트 리스너
  useEffect(() => {
    // 모달창 외부영역 클릭시, 모달창 닫기 구현
    if (dialogRef.current) {
      const dialogElement = dialogRef.current as HTMLDialogElement

      dialogElement.addEventListener('click', (event) => {
        const dialogArea = dialogElement.getBoundingClientRect()
        if (
          event.clientX < dialogArea.left ||
          event.clientX > dialogArea.right ||
          event.clientY < dialogArea.top ||
          event.clientY > dialogArea.bottom
        ) {
          dialogElement.close()
        }
      })
    }
  }, [])

  return (
    <div>
      {/* 모달 노출 버튼 */}
      <S.ShowModalButton onClick={showModal}>쿠폰함 확인</S.ShowModalButton>

      {/* dialog 엘리먼트 - 모달창 영역  */}
      <S.Dialog ref={dialogRef}>
        <S.XButtonWrapper>
          {/* 제목 + X버튼 영역 */}
          <S.XCloseButton onClick={closeModal}>
            <img src={Ximg} />
          </S.XCloseButton>
        </S.XButtonWrapper>
        <S.CpnEnrollWrapper>
          <S.CpnNumInput type="text" placeholder="쿠폰코드를 입력해 주세요" ref={couponCodeRef} />
          <S.CpnNumEnrollButton onClick={() => couponRegisterHandler()}>
            쿠폰등록
          </S.CpnNumEnrollButton>
        </S.CpnEnrollWrapper>
        <div>
          {/* 컨텐츠 영역 */}
          {couponList?.map((item: MyCouponList) => (
            <S.WelcomeCpnWrapper>
              <S.WelCpnContentWrapDiv>
                <S.WelCpnContentWrapLabel htmlFor="coupon" key={item.buyerCouponId}>
                  <S.CpnPriceDiv>{item.discountPrice.toLocaleString('ko-KR')}원</S.CpnPriceDiv>
                  <S.CpnNameDiv>{item.couponCode}</S.CpnNameDiv>
                  {/* <S.CpnExpireDiv>30일 후 만료 (2023/10/30)</S.CpnExpireDiv> */}
                  {/* <S.MinOrderPriceDiv>최소주문금액: 20,000원</S.MinOrderPriceDiv> */}
                </S.WelCpnContentWrapLabel>
              </S.WelCpnContentWrapDiv>
              <S.WelCpnCheckInput
                type="checkbox"
                id="coupon"
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e, item.discountPrice, item.buyerCouponId)}
              />
            </S.WelcomeCpnWrapper>
          ))}
        </div>

        <S.CpnUseWrapper>
          {/* 확인 버튼 영역 */}
          <S.CpnUseButton onClick={onConfirmHandler} disabled={!isChecked}>
            쿠폰 사용하기
          </S.CpnUseButton>
          {/* <PositionedSnackbar /> */}
        </S.CpnUseWrapper>
      </S.Dialog>
    </div>
  )
}

// getBoundingClientRect()

// top : 화면 상단 부터 대상의 처음 위치 값
// bottom : 화면 상단 부터 대상의 끝 위치 값
// left : 화면 좌측 부터 대상의 처음 위치 값
// right // 화면 좌측 부터 대상의 끝 위치 값
