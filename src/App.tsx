import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { generateQueryClient } from './react-query/queryClient'
import { RouterProvider } from 'react-router-dom'
import { routers } from './router.tsx'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { useAlert } from './pages/common/hooks'
import { SocketProvider } from './Provider/SocketProvider'
import GlobalStyle from './styles/GlobalStyles'
import { ThemeProvider as MuiTheme } from '@mui/material/styles'
import { theme } from './styles/theme.ts'
import { SnackbarProvider } from 'notistack'
import { tokenState } from './atoms/userInfoAtoms.ts'

// const token =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QzLmNvbSIsInVzZXJJZHgiOjE5LCJlbWFpbCI6InRlc3RAdGVzdDMuY29tIiwicm9sZSI6IkJVWUVSIiwibmlja25hbWUiOiLrp4nrp4jshZQiLCJpYXQiOjE2OTUzNjM1NDUsImV4cCI6MTY5NTUzNjM0NX0.Sf0G_xNdDx-dnkMiOBxxYdnbbO3037WpJZ9rKI_ZFQ4'

function App() {
  const toast = useAlert()
  const token = useRecoilValue(tokenState)

  return (
    <SnackbarProvider maxSnack={4}>
      <QueryClientProvider client={generateQueryClient(toast)}>
        <SocketProvider token={token}>
          <MuiTheme theme={theme}>
            <RecoilRoot>
              <GlobalStyle />
              <RouterProvider router={routers} />
              <ReactQueryDevtools />
            </RecoilRoot>
          </MuiTheme>
        </SocketProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  )
}

export default App
