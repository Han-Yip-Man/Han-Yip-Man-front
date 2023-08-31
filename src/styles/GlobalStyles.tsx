import { Global, css } from '@emotion/react'
import reset from 'styled-reset'

const style = css`
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

const GlobalStyle = () => {
  return <Global styles={style} />
}

export default GlobalStyle
