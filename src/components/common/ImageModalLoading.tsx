import Modal from '@mui/material/Modal'
import styled from '@emotion/styled'
import { LoadingModal } from '../../atoms/restaurantsAtoms'
import { useRecoilValue } from 'recoil'

const ImageModalLoading = () => {
  const open = useRecoilValue(LoadingModal)

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <LoadingContainer>
          <Loadingbox>
            <Loadingbox2>
              <LoadingItem></LoadingItem>
            </Loadingbox2>
          </Loadingbox>
        </LoadingContainer>
      </Modal>
    </>
  )
}

export default ImageModalLoading

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Loadingbox = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
`
const Loadingbox2 = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`

const LoadingItem = styled.div`
  position: absolute;
  animation: loading 1s linear infinite;
  width: 160px;
  height: 160px;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  box-shadow: 0 4px 0 0 #ea7600;
  transform-origin: 80px 82px;
  box-sizing: content-box;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
