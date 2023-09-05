import styled from '@emotion/styled'

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

export const ItemTable = styled.table`
  width: 100%;
  border-top: 1px solid rgba(68, 68, 68, 0.3);
  border-collapse: collapse;
`

export const Title = styled.tr`
  background-color: #f5f5f5;
  border-top: 2px solid black;
`

export const Thead = styled.tr`
  font-weight: normal;
  font-size: 15px;
  border-bottom: 1.2px solid rgba(68, 68, 68, 0.3);
  height: 50px;
`

export const Td1Title = styled.td`
  width: 500px;
  text-align: left;
  padding: 16px 30px;
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`

export const Td4Title = styled.td`
  text-align: center;
  font-size: 15px;
  color: gray;
  cursor: pointer;
`

export const Td1 = styled.td`
  width: 700px;
  text-align: center;
  padding: 16px 2px;
  margin: 0;
  font-weight: bold;
`

export const Td2 = styled.td`
  width: 250px;
  text-align: center;
  font-weight: bold;
`

export const Td3 = styled.td`
  width: 250px;
  text-align: center;
  font-weight: bold;
  /* font-weight: bold; */
  & > * {
    :not(:first-child) {
      font-weight: bold;
    }
  }
`

export const Td4 = styled.td`
  width: 200px;
  text-align: center;
  font-weight: bold;
`

export const Tr = styled.tr`
  border-bottom: 1px solid rgba(68, 68, 68, 0.3);
  border-left: none;
  padding: 10px;
  height: 110px;
`

export const ProductDiv = styled.div`
  display: flex;
  margin: 0;
  padding: 15px;
`

export const Img = styled.img`
  width: 150px;
`

export const ProductNameDiv = styled.div`
  padding: 15px;
`

export const CounterOuterDiv = styled.div`
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MinusButton = styled.button`
  /* margin: 20px 0; */
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
