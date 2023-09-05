import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { css } from '@emotion/react'
import { useTheme } from '@mui/material/styles'

interface Props {
  children: React.ReactNode
  primary?: boolean
  width?: number
}

interface BtnProps {
  primary?: boolean
  maincolor: string
  secondcolor: string
  width?: number
}

function BtnHeader({ children, primary, width }: Props) {
  const {
    palette: { custom },
  } = useTheme()

  return (
    <CustomBtn
      primary={primary}
      maincolor={custom.main}
      secondcolor={custom.secondary}
      width={width}
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
      ? css`
          background-color: ${props.maincolor};
          color: white;

          &:hover {
            background-color: ${props.maincolor};
            opacity: 0.95;
          }
        `
      : css`
          background-color: ${props.secondcolor};
          color: white;

          &:hover {
            background-color: ${props.secondcolor};
            opacity: 0.9;
          }
        `}
`
