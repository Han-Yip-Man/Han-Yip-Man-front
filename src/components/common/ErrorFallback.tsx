import React from 'react'
import styled from '@emotion/styled'
import { Button } from '@mui/material'

const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Wrap>
      <p>에러 메세지: {error.message}</p>
      <br />
      <Btn onClick={resetErrorBoundary}>다시 시도</Btn>
    </Wrap>
  )
}

export default ErrorFallback

const Wrap = styled.div`
  display: grid;
  place-items: center;
  height: 500px;
  padding-top: 100px;
  padding-bottom: 200px;
`

const Btn = styled(Button)`
  color: orange;
  font-size: 30px;
  border: 1px solid orange;
`
