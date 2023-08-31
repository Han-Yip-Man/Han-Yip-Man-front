import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.2;
  }

`

export default GlobalStyle
