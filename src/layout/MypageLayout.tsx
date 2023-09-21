import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import { SocketProvider } from '../Provider/SocketProvider'
import { SSEProvider } from '../Provider/SSEProvider'
import OrderAlarmProvider from '../Provider/OrderAlarmProvider'
// import sound from '../../assets/audio/hanyipSound.mp3'

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2R3MjEzMkBhc2R3LmFjIiwidXNlcklkeCI6MTgsImVtYWlsIjoiYXNkdzIxMzJAYXNkdy5hYyIsInJvbGUiOiJTRUxMRVIiLCJpYXQiOjE2OTUyMjM1ODIsImV4cCI6MTY5NTM5NjM4Mn0.nfBFoG7c9LBDx-onvh84PwPC7fAYYOl33f-YMOR5Ta8'

const MypageLayout = () => {
  return (
    <SocketProvider>
      <SSEProvider url={`http://39.115.156.83:8080/api/sse?token=${token}`}>
        <OrderAlarmProvider mode="seller">
          <Layout>
            <Outlet />
          </Layout>
        </OrderAlarmProvider>
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
