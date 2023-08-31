import { createMuiTheme } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
})
