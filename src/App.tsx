import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalStyle from './styles/GlobalStyles'
import { ThemeProvider as MuiTheme } from '@mui/material/styles'
import { theme } from './styles/theme.ts'
import { routers } from './router.tsx'
import { SnackbarProvider } from 'notistack'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={4}>
        <MuiTheme theme={theme}>
          <RecoilRoot>
            <GlobalStyle />
            <RouterProvider router={routers} />
            <ReactQueryDevtools />
          </RecoilRoot>
        </MuiTheme>
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default App
