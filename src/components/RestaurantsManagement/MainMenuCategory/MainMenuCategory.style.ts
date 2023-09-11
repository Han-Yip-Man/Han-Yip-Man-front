import styled from '@emotion/styled'
import { Button, Card, Grid } from '@mui/material'

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  align-items: center;
`
export const Title = styled.h2`
  margin: 30px 0;
  font-size: 30px;
  font-weight: 500;
`

export const From = styled.form`
  display: flex;
  gap: 40px;
  width: 50%;
  height: 56px;
`
export const StyleButton = styled(Button)`
  width: 180px;
`

export const Categorylist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 20px;
  padding: 20px;
`
export const StyleCard = styled(Card)`
  max-width: 250px;
  display: flex;
  border-radius: 15px;
  text-align: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  height: 50px;
  padding: 20px 20px;
  background-color: #f2cd00;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #444;
  cursor: pointer;
  &:active {
    background-color: #ea7600;
  }
`

export const Placeholder = styled.div`
  width: 500px;
  height: 50px;
  position: relative;
  margin: 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 50px;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.1);
    border: 2px dashed #aaa;
  }
`

export const StyleitemBtn = styled(Button)`
  background-color: #ea7600;
  color: #fff;
  border-color: #ea7600;
  border-radius: 15px;
  &:hover {
    background-color: #ea7600;
    color: #fff;
    border-color: #ea7600;
    opacity: 0.8;
  }
`

export const StyledItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  width: 390px;
  gap: 10px;
`

export const StyleGrid = styled(Grid)`
  display: flex;
  gap: 10px;
`
