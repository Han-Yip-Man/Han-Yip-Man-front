import styled from '@emotion/styled'

interface ModalProps {
  isOpen: boolean
}

export const ModalBackground = styled.div<ModalProps>`
  background-color: ${({ isOpen }) => (isOpen ? ' rgba(0, 0, 0, 0.8)' : 'none')};
  z-index: ${({ isOpen }) => (isOpen ? '999' : '-1')};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Modal = styled.div<ModalProps>`
  width: 300px;
  height: 180px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  p {
    width: 300px;
    height: 130px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const ModalBtn = styled.span`
  border-top: 1px solid gray;
  display: flex;
  width: 300px;
  height: 50px;
`

export const KeepShoppingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 150px;
  font-size: 12px;
  font-weight: bold;
  border-right: 1px solid gray;
`

export const GoCartBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 150px;
  font-size: 12px;
  font-weight: bold;
`
