import styled from '@emotion/styled'

export const Li = styled.li`
  display: grid;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  padding-left: 30px;
  cursor: pointer;
  position: relative;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: rgb(128, 128, 128, 0.2) !important;
  }
`

export const AddrName = styled.h3`
  padding-top: 20px;
  font-weight: bold;
`
export const AddrRoad = styled.p`
  margin-top: 10px;
  color: gray;
`
