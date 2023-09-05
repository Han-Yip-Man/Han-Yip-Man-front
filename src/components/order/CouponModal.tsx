import * as S from './CouponModal.Styles'
import { useEffect, useRef } from 'react'
import PositionedSnackbar from './PositionedSnackbar'

type ModalProps = {
  title?: string // 모달창 제목을 Prop으로 받을 수 있다.
  content?: string // 모달창 컨텐츠를 Prop으로 받을 수 있다.
  onConfirm?: () => void // 모달창의 확인 버튼 클릭시, 실행할 함수를 Prop으로 받을 수 있다.
}

export default function CouponModal({ title, content }: ModalProps) {
  // dialog 참조 ref
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  // modal 오픈 함수
  const showModal = () => {
    dialogRef.current?.showModal() // 모달창 노출. show() 호출하면 다이얼로그 노출
  }

  // Modal 닫기 함수
  const closeModal = () => {
    dialogRef.current?.close() // 모달창 닫기
  }

  useEffect(() => {
    // 모달창 외부영역 클릭시, 모달창 닫기 구현
    if (dialogRef.current) {
      const dialogElement = dialogRef.current as HTMLDialogElement

      dialogElement.addEventListener('click', (event) => {
        const dialogArea = dialogElement.getBoundingClientRect()
        if (event.clientX < dialogArea.left || event.clientX > dialogArea.right || event.clientY < dialogArea.top || event.clientY > dialogArea.bottom) {
          dialogElement.close()
        }
      })
    }
  }, [])

  return (
    <div>
      {/* 모달 노출 버튼 */}
      <button onClick={showModal}>쿠폰 확인</button>

      {/* dialog 엘리먼트 - 모달창 영역  */}
      <S.Dialog ref={dialogRef}>
        <div>
          {/* 제목 + X버튼 영역 */}
          <span>{title || '기본 타이틀'}</span>
          <button onClick={closeModal}>X버튼</button>
        </div>

        <div>
          {/* 컨텐츠 영역 */}
          <p>{content || '기본 컨텐츠가 표시됩니다.'}</p>
        </div>

        <div>
          {/* 확인 버튼 영역 */}
          {/* <button onClick={onConfirm || closeModal}>확인</button> */}
          <PositionedSnackbar />
        </div>
      </S.Dialog>
    </div>
  )
}

// getBoundingClientRect()

// top : 화면 상단 부터 대상의 처음 위치 값
// bottom : 화면 상단 부터 대상의 끝 위치 값
// left : 화면 좌측 부터 대상의 처음 위치 값
// right // 화면 좌측 부터 대상의 끝 위치 값
