import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from '../pages/app/common/header/Header'
import Container from '@mui/material/Container'
import useRouter from '../hooks/useRouter'
import { SSEProvider } from '../Provider/SSEProvider'
import OrderAlarmProvider from '../Provider/OrderAlarmProvider'
import { SocketProvider } from '../Provider/SocketProvider'

const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QzLmNvbSIsInVzZXJJZHgiOjE5LCJlbWFpbCI6InRlc3RAdGVzdDMuY29tIiwicm9sZSI6IkJVWUVSIiwibmlja25hbWUiOiLrp4nrp4jshZQiLCJpYXQiOjE2OTUzMjQ4MDYsImV4cCI6MTY5NTQ5NzYwNn0.-qcm4xEJCsqjQb-SGzZ5cpMmTvTWBWPYQlq6d8lv_3A'

function GeneralLayout() {
  const { currentPath } = useRouter()

  return (
    <SocketProvider token={token}>
      <OrderAlarmProvider mode="customer">
        <CustomContainer maxWidth="xl" disableGutters>
          {currentPath === '/' && (
            <BackgroundWrapper>
              <Background autoPlay loop muted>
                <source src="/background/background.webm" type="video/webm" />
              </Background>
            </BackgroundWrapper>
          )}
          <Header />
          <Outlet />
        </CustomContainer>
      </OrderAlarmProvider>
    </SocketProvider>
  )
}

export default GeneralLayout

const CustomContainer = styled(Container)`
  /* height: 100vh; */
`
const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.4);
  }
`

const Background = styled.video`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  object-fit: cover;
  background: no-repeat;
`
