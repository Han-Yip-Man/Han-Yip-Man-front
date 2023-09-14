import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { css as Rcss } from '@emotion/react'
import { useTheme } from '@mui/material/styles'
import { css } from '@emotion/css'

interface Props {
  children: React.ReactNode
  primary?: boolean
  width?: number
  currentPath?: boolean
  onClick: () => void
}

interface BtnProps {
  primary?: boolean
  maincolor: string
  secondcolor: string
  width?: number
}

function BtnHeader({ children, primary, width, currentPath, onClick }: Props) {
  const {
    palette: { custom },
  } = useTheme()

  return (
    <CustomBtn
      primary={primary}
      maincolor={custom.main}
      secondcolor={custom.secondary}
      width={width}
      className={css`
        &&&&&&&& {
          ${!currentPath && btnScale}
          transition: all 0.4s;
        }
      `}
      onClick={onClick}
    >
      {children}
    </CustomBtn>
  )
}

export default BtnHeader

const CustomBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'primary',
})<BtnProps>`
  border-radius: 50px;
  width: ${(props) => `${props.width}px`};
  height: 50px;
  font-size: 17px;
  line-height: 50px;
  font-weight: 800 !important;
  font-family: 'bae' !important;
  letter-spacing: 3px;

  ${(props) =>
    props.primary
      ? Rcss`
          background-color: ${props.maincolor};
          color: white;

          &:hover {
            background-color: ${props.maincolor};
            opacity: 0.95;
          }
        `
      : Rcss`
          background-color: ${props.secondcolor};
          color: white;

          &:hover {
            background-color: ${props.secondcolor};
            opacity: 0.9;
          }
        `}
`

const btnScale = css`
  transform: scale(0.75);
`
