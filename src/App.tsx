import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalStyle from './styles/GlobalStyles'
import { ThemeProvider as MuiTheme } from '@mui/material/styles'
import { theme } from './styles/theme.ts'
import { routers } from './router.tsx'
import { SnackbarProvider } from 'notistack'
import { useAlert } from './pages/common/hooks/index.ts'
import { generateQueryClient } from './react-query/queryClient.ts'

function App() {
  const toast = useAlert()

  return (
    <SnackbarProvider maxSnack={4}>
      <QueryClientProvider client={generateQueryClient(toast)}>
        <MuiTheme theme={theme}>
          <RecoilRoot>
            <GlobalStyle />
            <RouterProvider router={routers} />
            <ReactQueryDevtools />
          </RecoilRoot>
        </MuiTheme>
      </QueryClientProvider>
    </SnackbarProvider>
  )
}

export default App
