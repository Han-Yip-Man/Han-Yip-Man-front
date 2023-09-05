import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

const SignLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default SignLayout

const Layout = styled.div`
  max-width: 1220px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
