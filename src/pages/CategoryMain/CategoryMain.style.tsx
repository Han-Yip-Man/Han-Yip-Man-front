import styled from '@emotion/styled'
import { Grid } from '@mui/material'

export const MainWrap = styled.div`
  min-height: 1600px;
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
