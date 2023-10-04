import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
// import { SocketProvider } from '../Provider/SocketProvider'
import OrderAlarmProvider from '../Provider/OrderAlarmProvider'

// const token2 =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXN1bmdAZ21haWwuY29tIiwidXNlcklkeCI6MTMsImVtYWlsIjoicGFzdW5nQGdtYWlsLmNvbSIsInJvbGUiOiJTRUxMRVIiLCJuaWNrbmFtZSI6InBhc3VuZyIsImlhdCI6MTY5NTMyODQ4OSwiZXhwIjoxNjk1NTAxMjg5fQ.Out3Zo7VD0zW9iGUdhRwALFJDwxH2bL0aDK9EZoEROI'

const MypageLayout = () => {
  return (
    // <SocketProvider token={token2}>
    <OrderAlarmProvider mode="seller">
      <Layout>
        <Outlet />
      </Layout>
    </OrderAlarmProvider>
    // </SocketProvider>
  )
}

export default MypageLayout

const Layout = styled.div`
  max-width: 1420px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`
