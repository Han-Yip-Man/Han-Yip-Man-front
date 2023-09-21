import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import { SocketProvider } from '../context/SocketProvider'
import { SSEProvider } from '../context/SSEProvider'

const MypageLayout = () => {
  return (
    <SocketProvider>
      <SSEProvider>
        <Layout>
          <Outlet />
        </Layout>
      </SSEProvider>
    </SocketProvider>
  )
}

export default MypageLayout

const Layout = styled.div`
  max-width: 1420px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`
