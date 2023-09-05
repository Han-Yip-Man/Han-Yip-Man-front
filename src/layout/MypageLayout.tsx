import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

const MypageLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default MypageLayout

const Layout = styled.div`
  max-width: 1420px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`
