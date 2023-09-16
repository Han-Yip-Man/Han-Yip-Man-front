import styled from '@emotion/styled'
import { Button, ButtonProps, ButtonGroup, Grid, Fab } from '@mui/material'
import UpIcon from '@mui/icons-material/KeyboardArrowUp'

interface CustomBtnProps extends ButtonProps {
  active: boolean
}

export const MainWrap = styled.div`
  min-height: 1600px;
`

export const ChickenIcon = styled.img`
  height: 20px;
  width: 20px;
`

export const SushiIcon = styled.img`
  height: 22px;
  width: 22px;
`

export const CategoryImg = styled.div`
  background: url('/img/category3.jpg') no-repeat 0 68px / cover fixed;
  height: 650px;
`

export const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;

  /* position: sticky;
  top: 30px; */
  margin-bottom: 20px;
`

export const CustomGrid = styled(Grid)`
  && {
    display: grid;
    place-items: center;
    height: 130px;
    background-color: white;
    margin-top: 20px;
  }
`

export const BtnGrid = styled(Grid)`
  /* max-width: 100%; */
  grid-template-rows: 1fr;
  margin: 0 auto;
  gap: 2px;
  background-color: white;
  padding-bottom: 20px;
`

export const SearchInput = styled.input`
  height: 80px;
  outline: none;
  font-size: 26px;
  font-family: inherit;
  padding: 10px 20px 10px 20px;
  line-height: 80px;
  border: none;
  border-bottom: 0.7px solid rgb(68, 68, 68, 0.2);
  width: 350px;
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

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 1fr));
  gap: 20px;
  align-items: start;
`

export const CustomFab = styled(Fab)`
  position: fixed;
  right: 40px;
  bottom: 40px;
  background-color: orange;
  display: flex;
  flex-direction: column;

  &:active,
  &:hover {
    background-color: orange;
  }
`

export const CustomUpIcon = styled(UpIcon)``
