import styled from '@emotion/styled'

export const Dialog = styled.dialog`
  width: 50vw;
  height: 50vh;
  background-color: white;
  border-radius: 20px;
  border: none;
  &::backdrop {
    background-color: rgb(194, 188, 191, 0.75);
  }
`
// 박스 입체감 추후작업
