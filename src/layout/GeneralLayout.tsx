import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

function GeneralLayout() {
  console.log(LayOut)
  return (
    <LayOut>
      <Outlet />
    </LayOut>
  )
}

export default GeneralLayout

const LayOut = styled.div``
