import { useRouter } from '../../common/hooks'
import * as S from './MenuDetailModal.Styles'

interface MenuDetailModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenuDetailModal({ isOpen, setIsOpen }: MenuDetailModalProps) {
  const { routeTo } = useRouter()

  const modalIsClose = () => {
    setIsOpen(false)
  }

  return (
    <S.ModalBackground isOpen={isOpen}>
      <S.Modal isOpen={isOpen}>
        <S.ModalContent>
          <p>선택하신 상품을 장바구니에 담았습니다.</p>
          <S.ModalBtn>
            <S.KeepShoppingBtn onClick={modalIsClose}>계속 쇼핑하기</S.KeepShoppingBtn>
            <S.GoCartBtn onClick={() => routeTo('/cart')}>장바구니로 이동</S.GoCartBtn>
          </S.ModalBtn>
        </S.ModalContent>
      </S.Modal>
    </S.ModalBackground>
  )
}
