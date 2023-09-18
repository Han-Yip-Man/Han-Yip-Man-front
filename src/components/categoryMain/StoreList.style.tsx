import styled from '@emotion/styled'

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 1fr));
  gap: 20px;
  align-items: start;
`

export const LoadingWrap = styled.div`
  display: grid;
  place-items: center;
`

export const Observer = styled.div`
  height: 200px;
  width: 100px;
  /* background-color: gray; */
  /* bottom: 50px; */
`
