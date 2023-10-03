import styled from '@emotion/styled'
import { ButtonGroup, Button, ButtonProps } from '@mui/material'

interface CustomBtnProps extends ButtonProps {
  active: boolean
}

export const FilterWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  background-color: white;
  padding-bottom: 10px;
`

export const FilterBtnWrap = styled(ButtonGroup)`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  height: 20px;
`

export const FilterBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<CustomBtnProps>`
  color: ${({ active }) => (active ? 'orange' : 'black')};
  &&&&&&&&&&&& {
    border-color: black;
  }
`
