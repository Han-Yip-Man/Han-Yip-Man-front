import styled from '@emotion/styled'
import UpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Fab } from '@mui/material'

function MoveToTop() {
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <CustomFab onClick={MoveToTop}>
      <CustomUpIcon />
      Top
    </CustomFab>
  )
}

export default MoveToTop

export const CustomFab = styled(Fab)`
  position: fixed;
  right: 40px;
  bottom: 40px;
  background-color: orange;
  display: flex;
  flex-direction: column;

  &:active,
  &:hover {
    background-color: orange;
  }
`

export const CustomUpIcon = styled(UpIcon)``
