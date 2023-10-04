import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`
export const GridContainer = styled.div`
  width: 70%;
  height: 50%;
  margin: 50px auto 0;
`

export const InfoGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ValueGrid = styled(Grid)`
  display: flex;
  justify-content: start;
  align-items: center;
`
export const ImageGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ImagePreview = styled.div`
  width: 125px;
  height: 125px;
  img {
    width: 100%;
    height: 100%;
  }
`

export const ActionGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const ActionButton = styled(Button)``

export const BackButton = styled.img`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`
