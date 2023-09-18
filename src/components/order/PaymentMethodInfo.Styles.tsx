import styled from '@emotion/styled'

export const OuterDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 70px;
  /* border: 1px solid gray; */
  display: flex;
  flex-direction: column;
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

export const Td1Title = styled.td`
  width: 500px;
  text-align: left;
  padding: 16px 30px;
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`

export const Thead = styled.tr`
  font-weight: normal;
  font-size: 15px;
  border-bottom: 1.2px solid rgba(68, 68, 68, 0.3);
  height: 50px;
`

export const Td1 = styled.td`
  width: 700px;
  /* text-align: center; */
  padding: 25px 2px;
  margin: 0;
  font-weight: 540;
`

export const Td1InnerDiv = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 15px;
`

export const KakaoButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 0;
  border: 1px solid #c2bcbf; /* #e5e5e5; */
  background-color: white;
  cursor: pointer;
`

export const KakaoImg = styled.img`
  width: 60px;
  margin-top: 6px;
`

export const TossButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 0;
  border: 1px solid #c2bcbf; /* #e5e5e5; */
  background-color: white;
  cursor: pointer;
`

export const TossImg = styled.img`
  width: 70px;
  margin-top: 3px;
`

export const PortOneButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 0;
  border: 1px solid #c2bcbf; /* #e5e5e5; */
  background-color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
`