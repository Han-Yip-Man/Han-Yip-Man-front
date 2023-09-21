import styled from '@emotion/styled'
import { Grid } from '@mui/material'

export const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 850px;
  height: 600px;
  background-color: #fff;
  box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const GridContainer = styled(Grid)`
  width: 100%;
  height: 100%;
`

export const InfoGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ea7600;
`

export const ValueGrid = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const ActionGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`
