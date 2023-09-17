import styled from '@emotion/styled'

export const WrapperDiv = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 100vw;
  margin: 50px auto 0;
  box-sizing: border-box;
  gap: 20px;
`

export const MainWrapperDiv = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 1150px;
  width: 100%;
  margin: 0 auto;
  padding-left: 16px;
  padding-bottom: 150px;
  box-sizing: border-box;
  gap: 20px;
`

export const FixedDiv = styled.div`
  position: fixed;
  box-sizing: border-box;
  width: 45%;
  height: 120%;
  margin-left: 50px;
`

export const Img = styled.img`
  width: 550px;
  height: 550px;
  padding: 50px 0;
`

export const OptionDiv = styled.div`
  margin-left: 650px;
`

export const MenuInfoDiv = styled.div`
  width: 80%;
  height: auto;
  margin-top: 50px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
`

export const MenuNameDiv = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-top: 10px;
  margin-bottom: 20px;
`

export const MenuExpDiv = styled.div`
  font-size: 15px;
  margin-bottom: 30px;
`
export const MenuPriceDiv = styled.div`
  width: 150px;
  height: 45px;
  text-align: center;
  background-color: rgb(115, 115, 222, 0.7);
  color: white;
  font-size: 20px;
  padding-top: 10px;
  border: none;
  border-radius: 50px;
`

export const OptionBox = styled.div`
  box-sizing: border-box;
  width: 80%;
  height: auto;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
`

export const BottomDiv = styled.div`
  z-index: 2;
  position: fixed;
  width: 100vw;
  height: 120px;
  bottom: 0;
  background-color: #f5f5f5;
`

export const MainOuterDiv = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1150px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 50px;
`

export const TitleDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`
export const PickedMenuDiv = styled.div``

export const TotalPriceDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`

export const OrderButton = styled.button`
  border: none;
  width: 150px;
  height: 50px;
  background-color: blue;
  color: white;
  cursor: pointer;
`
