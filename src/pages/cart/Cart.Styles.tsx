import styled from '@emotion/styled'
import { Divider, Typography, Button } from '@mui/material'

export const OuterDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 70px;
  /* border: 1px solid gray; */
  display: flex;
  flex-direction: column;
`

export const TopDiv = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0px;
  height: 35px;
  margin-bottom: 30px;
`

export const TitleDiv = styled.div`
  font-size: 30px;
  text-align: left;
  margin-right: 10px;
  padding: 5px 0px;
`

export const TotalCountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: #ffb002;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  color: white;
  padding: 0px;
  margin: -3px;
`

export const CustomDivider = styled(Divider)`
  border: 1px solid black;
`

export const ListWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`

export const TitleWrap = styled.div`
  display: grid;
  grid-template-rows: 60px 60px;
`

export const ListTitleWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 60px;
  background-color: rgb(128, 128, 128, 0.4);
`

export const CustomTypo = styled(Typography)``

export const BtnWrap = styled.div`
  justify-self: end;
  margin-right: 50px;
`

export const CustomBtn = styled(Button)`
  color: black;
`

export const SubTitleWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  height: 60px;
  padding-top: 10px;
  /* background-color: gray; */
`

export const SubTitleTypo = styled(Typography)``

export const ItemList = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  gap: 10px;
`

export const ItemLi = styled.li`
  height: 150px;
  background-color: rgb(128, 128, 128, 0.2);
  display: grid;
  grid-template-columns: 400px 1fr;
`

export const ItemDescWrap = styled.div`
  display: flex;
`

export const ItemImg = styled.img`
  object-fit: cover;
  width: 200px;
`

export const ImgTitle = styled(Typography)`
  padding: 10px;
  width: 100%;
`

export const OptionWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const CounterWrap = styled.div`
  align-self: end;
  justify-self: center;
  padding-bottom: 10px;
`

export const CounterBtnWrap = styled.div`
  display: flex;
`
export const CounterBtnMinus = styled.button``

export const CounterDisplay = styled.div``

export const CounterBtnPlus = styled.button``

export const TotalWrap = styled.div`
  align-self: end;
  justify-self: end;
  padding: 10px;
  padding-right: 20px;
`

export const Total = styled(Typography)``

export const ProductNameDiv = styled.div`
  padding: 15px;
`

export const CounterOuterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  && {
    vertical-align: middle;
  }
`

export const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MinusButton = styled.button`
  padding: 0px;
  height: 50px;
  width: 40px;
  background-color: white;
  border: 1px solid gray;
  border-right: none;
  border-radius: 25px 0 0 25px;
  outline: none;
  &:focus {
    outline: none;
  }
`
export const MinusPlusImg = styled.img`
  width: 30px;
  padding: 5px 5px 0 5px;
  cursor: pointer;
`

export const PlusButton = styled.button`
  padding: 0px;
  height: 50px;
  width: 40px;
  background-color: white;
  border: 1px solid gray;
  border-left: none;
  border-radius: 0 25px 25px 0;
  &:focus {
    outline: none;
  }
`

export const CountInput = styled.input`
  padding: 0px;
  height: 50px;
  width: 40px;
  text-align: center;
  font-size: 15px;
  border-left: none;
  border-right: none;
  /* border: none; */
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  &:focus {
    outline: none;
  }
`

export const XImg = styled.img`
  cursor: pointer;
`

export const TotalPriceDiv = styled.div`
  text-align: right;
  border-bottom: 2px solid black;
  padding: 25px 30px;
  font-size: 22px;
`

export const Span = styled.span`
  font-size: 33px;
  font-weight: bold;
`

export const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

export const ShopGoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`

export const ShopGoButton = styled.button`
  border: 1px solid rgba(68, 68, 68, 0.3);
  background-color: white;
  width: 200px;
  height: 60px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`

export const OrderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`

export const OrderButton = styled.button`
  border: none;
  background-color: red;
  color: white;
  width: 200px;
  height: 60px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
`

export const NoItems = styled.div`
  padding: 8px;
  width: fit-content;
  margin: 40px auto;
  border-radius: 4px;
  text-align: center;
  border: 1px solid var(--line-gray);
`
