import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import styled from '@emotion/styled'
// import { useRecoilState } from 'recoil'
// import { jeeinAtom } from '../../atoms'

interface State extends SnackbarOrigin {
  open: boolean
}

export default function PositionedSnackbar() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })

  // const [jeein, setJeeIn] = useRecoilState(jeeinAtom)

  const { vertical, horizontal, open } = state

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const buttons = (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>확인</Button>
      </Box>
    </React.Fragment>
  )

  return (
    <Box sx={{ width: 500 }}>
      <DivSome></DivSome>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="쿠폰이 적용 되었습니다."
        key={vertical + horizontal}
      />
    </Box>
  )
}

const DivSome = styled(Box)``
