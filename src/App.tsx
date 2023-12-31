import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalStyle from './styles/GlobalStyles'
import { ThemeProvider as MuiTheme } from '@material-ui/styles'
import { theme } from './theme.ts'
import { routers } from './router.tsx'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiTheme theme={theme}>
        <RecoilRoot>
          <GlobalStyle />
          <RouterProvider router={routers} />
          <ReactQueryDevtools />
        </RecoilRoot>
      </MuiTheme>
    </QueryClientProvider>
  )
}

export default App
