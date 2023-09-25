import styled from '@emotion/styled'

export const DashboardWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Title = styled.div`
  margin: 50px;
  h2 {
    font-size: 30px;
  }
`

export const ItemList = styled.div`
  margin-top: 30px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .MuiCard-root {
    display: flex;
    align-items: center;
    width: 800px;
    padding: 10px 25px;
    margin-bottom: 30px;
    .MuiCardContent-root {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      span {
        color: red;
      }
    }
    .MuiChip-root {
      font-size: 20px;
      padding: 5px;
    }
  }
`
