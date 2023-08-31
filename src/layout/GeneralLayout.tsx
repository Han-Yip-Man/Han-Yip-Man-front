import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'

function GeneralLayout() {
  return (
    <LayOut>
      <Outlet />
    </LayOut>
  )
}

export default GeneralLayout

const LayOut = styled.div``
