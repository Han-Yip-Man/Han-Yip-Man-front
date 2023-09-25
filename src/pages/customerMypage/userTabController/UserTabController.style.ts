import styled from '@emotion/styled'

export const TabWrapper = styled.div`
  width: 220px;
  height: 100%;
  background-color: #f2cd00;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
  border: 1px solid #f2cd00;
`
export const Title = styled.div`
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: #ea7600;
  color: #fff;
`

export const TabMenu = styled.div`
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: #fff;
  color: #000;
  &:hover {
    transition: all 0.3s;
    background-color: #ea7600;
    cursor: pointer;
  }
`
