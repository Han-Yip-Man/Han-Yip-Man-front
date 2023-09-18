import styled from '@emotion/styled'
import Select from '@mui/material/Select'

export const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ea7600;
  color: #fff;
  display: flex;
  align-items: center;
`
export const CenteredDiv = styled.div`
  flex: 1;
  text-align: center;
  font-size: 28px;

  display: flex;
  justify-content: center;
  h2 {
    width: auto;
    height: auto;
    cursor: pointer;
  }
`

export const StyledSelect = styled(Select)`
  margin-left: auto;
  margin-right: 20px;
  background-color: #fff;
  &.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }
  label {
    opacity: 1;
  }
`
