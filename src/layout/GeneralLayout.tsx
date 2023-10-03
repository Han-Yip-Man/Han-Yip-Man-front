import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from '../pages/common/components/header/Header'
import Container from '@mui/material/Container'
import OrderAlarmProvider from '../Provider/OrderAlarmProvider'
import { SocketProvider } from '../Provider/SocketProvider'
import { useRouter } from '../pages/common/hooks'

const token = sessionStorage.getItem('accessToken') || ''
// 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QzLmNvbSIsInVzZXJJZHgiOjE5LCJlbWFpbCI6InRlc3RAdGVzdDMuY29tIiwicm9sZSI6IkJVWUVSIiwibmlja25hbWUiOiLrp4nrp4jshZQiLCJpYXQiOjE2OTUzNjM1NDUsImV4cCI6MTY5NTUzNjM0NX0.Sf0G_xNdDx-dnkMiOBxxYdnbbO3037WpJZ9rKI_ZFQ4'

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
