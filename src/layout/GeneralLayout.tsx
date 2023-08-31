import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material/styles'

function GeneralLayout() {
  const theme = useTheme()
  console.log(theme)
  return (
    <LayOut>
      <Outlet />
    </LayOut>
  )
}

export default GeneralLayout

const LayOut = styled.div``
