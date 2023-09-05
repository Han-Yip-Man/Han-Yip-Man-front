import TextField from '@mui/material/TextField'
import styled from '@emotion/styled'
import React from 'react'
import Button from '@mui/material/Button'

const InputField = React.forwardRef<
  HTMLInputElement,
  {
    label: string
    type?: string
    errorMessage?: string | false
    checkDuplication?: () => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    maxLength?: number
    placeholder?: string
    onClick?: () => void
    value?: string
  }
>(({ label, type = 'text', errorMessage, checkDuplication, onChange, maxLength, placeholder, ...props }, ref) => (
  <InputWrapper>
    <div className="input-row">
      <TextField
        fullWidth
        label={label}
        type={type}
        error={!!errorMessage}
        helperText={errorMessage || ' '}
        inputRef={ref}
        onChange={onChange}
        variant="outlined"
        inputProps={{ maxLength: maxLength }}
        placeholder={placeholder}
        {...props}
      />
      {checkDuplication && (
        <StyledButton variant="outlined" onClick={checkDuplication}>
          중복검사
        </StyledButton>
      )}
    </div>
  </InputWrapper>
))

export default InputField

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .input-row {
    display: flex;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;

    .MuiTextField-root {
      flex: 1;
      label.Mui-focused {
        color: #ea7600;
      }
      .MuiOutlinedInput-root {
        &.Mui-focused fieldset {
          border-color: #ea7600;
        }
      }
    }
  }
`
const StyledButton = styled(Button)`
  margin-left: 20px;
  height: 56px;
  align-items: top;
  color: #fff;
  border-color: transparent;
  background-color: #ea7600;
  &:hover {
    border-color: transparent;
    background-color: #ea9600;
  }
`
