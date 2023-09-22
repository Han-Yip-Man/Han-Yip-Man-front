import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import { Zoom, Fab, useMediaQuery } from '@mui/material'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { accordionExpand } from '../../atoms/orderManageAtoms'
import ChatRoom from './ChatRoom'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

const ChatRoomEnter = ({ orderId }: { orderId: number }) => {
  const zoom = useRecoilValue(accordionExpand)
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <CustomZoom in={!!zoom} timeout={300} onClick={handleClickOpen}>
        <CustomFab>
          <TransferWithinAStationIcon />
        </CustomFab>
      </CustomZoom>
      <ChatRoom fullScreen={fullScreen} open={open} onClose={handleClose} orderId={orderId} />
    </>
  )
}

export default ChatRoomEnter

const CustomZoom = styled(Zoom)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  transition-delay: 3ms;
  width: 40px;
  height: 30px;
`

const CustomFab = styled(Fab)`
  background-color: green;

  &&:hover,
  &&:active {
    background-color: orange;
  }
`
