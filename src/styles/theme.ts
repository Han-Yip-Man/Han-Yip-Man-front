import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    custom: {
      main: '#f2cd00',
      secondary: '#ea7600',
    },
  },
  typography: {
    fontFamily: 'bae',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '&.Mui-focused, &:hover, &:active': {
              border: 'none', // 원하는 테두리색으로 변경하세요.
            },
          },
        },
      ],
    },
  },
})
