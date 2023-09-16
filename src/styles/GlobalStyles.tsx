import { Global, css } from '@emotion/react'
import emotionReset from 'emotion-reset'

const style = css`
  ${emotionReset}
  @font-face {
    font-family: 'uber';
    src: url('/fonts/UberMoveMedium.otf') format('opentype');
  }
  @font-face {
    font-family: 'uber bold';
    src: url('/fonts/UberMoveBold.otf') format('opentype');
  }
  @font-face {
    font-family: 'bae';
    src: url('/fonts/BMHANNAProOTF.otf') format('opentype');
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'bae', sans-serif;
    line-height: 1;
  }
`

const GlobalStyle = () => {
  return <Global styles={style} />
}

export default GlobalStyle
