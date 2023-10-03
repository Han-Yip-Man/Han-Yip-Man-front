import styled from '@emotion/styled'
import { Button, ButtonProps, Grid } from '@mui/material'

interface CustomBtnProps extends ButtonProps {
  active: boolean
}

export const SushiIcon = styled.img`
  height: 22px;
  width: 22px;
`

export const ChickenIcon = styled.img`
  height: 20px;
  width: 20px;
`

export const BtnGrid = styled(Grid)`
  /* max-width: 100%; */
  grid-template-rows: 1fr;
  margin: 0 auto;
  gap: 2px;
  background-color: white;
  padding-bottom: 20px;
`

export const CustomBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<CustomBtnProps>`
  height: 70px;
  font-size: 20px;
  word-wrap: break-all;
  white-space: pre-line;
  color: black;
  border-radius: 12px;
  line-height: 1.2;
  border: none;
  min-width: 130px;

  background-color: ${({ active }) => active && 'orange'};

  &:active,
  &:hover {
    background-color: orange;
  }

  & .MuiTouchRipple-root span {
    background-color: rgb(255, 255, 255, 0.5);
  }
`
