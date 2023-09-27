import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  selectedShopNameState,
  shopdeletemodal,
  selectedShopIdState,
} from '../../../atoms/restaurantsAtoms'
import * as S from './RestaurantDeleteModal.style'
import { deleteShop } from '../../../api/restaurant'
import useAlert from '../../../pages/common/hooks/useAlert'

const RestaurantDeleteModal = () => {
  const [open, setOpen] = useRecoilState(shopdeletemodal)
  const ShopName = useRecoilValue(selectedShopNameState)
  const ShopId = useRecoilValue(selectedShopIdState)
  const toast = useAlert()

  const handleClose = () => setOpen(false)

  const handleDelete = () => {
    if (ShopId !== null) {
      deleteShop(ShopId)
        .then(() => {
          toast('현재가게를 삭제하였습니다.', 2000, 'success')
          setTimeout(() => {
            setOpen(false)
            window.location.reload()
          }, 2000)
        })
        .catch(() => {
          toast('삭제에 실패하였습니다', 2000, 'error')
        })
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <S.StyledBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            정말로 {ShopName} 를(을) 삭제할까요?
          </Typography>
          <S.ButtonBox>
            <Button variant="contained" onClick={handleDelete}>
              삭제하기
            </Button>
            <Button variant="contained" onClick={handleClose}>
              취소
            </Button>
          </S.ButtonBox>
        </S.StyledBox>
      </Modal>
    </div>
  )
}

export default RestaurantDeleteModal
