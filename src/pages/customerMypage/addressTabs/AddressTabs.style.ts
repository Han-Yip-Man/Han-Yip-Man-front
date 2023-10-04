import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const Search = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  padding-left: 10px;
  padding-right: 10px;
  place-items: center;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;

  & label.Mui-focused {
    color: black;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`
export const CustomBtn = styled(Button)`
  color: black;
  border-color: black;

  &:hover,
  &:active {
    border: 1px solid black;
  }
`
