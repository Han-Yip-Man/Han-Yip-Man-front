import styled from '@emotion/styled'
import { Button, Select } from '@mui/material'

export const Navigation = styled.div`
  height: 60px;
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  padding-right: 30px;
  align-items: center;
`

export const StyleBtn = styled(Button)`
  height: 40px;
  width: 100px;
`

export const StyleSelect = styled(Select)`
  height: 40px;
  width: 220px;

  /* &.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: red;
  } */
`
