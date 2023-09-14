import styled from '@emotion/styled'
import { Button, Container } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'

export const MainWrap = styled.div`
  display: grid;
  grid-template-rows: 200px 1fr;
  height: 100%;
  padding-top: 100px;
`

export const MainTitle = styled.h1`
  color: white;
  font-size: 40px;
  display: grid;
  place-items: center;
  margin-bottom: 50px;
`

export const CustomWrap = styled(Container)`
  display: grid;
  justify-content: center;
  margin-top: 150px;
`

export const AddrWrap = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr;
`

export const InputWrap = styled.div`
  display: flex;
  position: relative;
`

export const AddrUl = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  overflow: scroll;
  border-radius: 15px;
  margin-top: 20px;
  width: 100%;
  background-color: white;
  padding: 15px 15px 15px 15px;
  gap: 5px;
  max-height: 500px;
`

export const InputIcon = styled(PlaceIcon)`
  position: absolute;
  top: 18px;
  left: 20px;
`

export const AddrInput = styled.input`
  width: 100%;
  height: 60px;
  outline: none;
  border-radius: 20px;
  border: none;
  padding-left: 55px;
  /* cursor: pointer; */
  font-size: 20px;
  line-height: 60px;
  font-family: inherit;

  &::placeholder {
    font-size: 17px;
    font-weight: bold;
    font-family: inherit;
  }
`

export const CustomBtn = styled(Button)<BtnThemeProps>`
  font-size: 17px;
  font-weight: bold;
  font-family: inherit;
  background-color: ${({ btncolor }) => btncolor.secondary};
  margin-left: 10px;
  height: 60px;
  white-space: nowrap;
  border-radius: 15px;
  padding: 30px;

  &:hover {
    background-color: ${({ btncolor }) => btncolor.main};
  }
`
