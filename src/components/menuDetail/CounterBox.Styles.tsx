import styled from '@emotion/styled'

export const Counter = styled.div`
  width: 100%;
`

export const CountTitle = styled.div`
  padding-bottom: 20px;
`

export const Box = styled.div`
  width: 100%;
  height: 90px;
  margin-bottom: 10px;
`

export const PrcieWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PlusMinus = styled.div`
  display: flex;
`

export const MinusBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  width: 60px;
  height: 50px;
  font-size: 40px;
  border: 1px solid #dddddd;
  border-right: none;
  border-radius: 25px 0 0 25px;
  background-color: white;
  cursor: pointer;
`

export const CountNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 50px;
  border: 1px solid #dddddd;
  background-color: white;
  border-left: none;
  border-right: none;
  input {
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    border-width: 0;
    &:focus {
      outline: none;
    }
  }
`

export const PlusBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 50px;
  font-size: 40px;
  border: 1px solid #dddddd;
  border-left: none;
  border-radius: 0 25px 25px 0;
  background-color: white;
  cursor: pointer;
`
