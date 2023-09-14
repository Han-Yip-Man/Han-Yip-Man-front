import styled from '@emotion/styled'

export const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ButtonBox = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 50px;
  button {
    font-size: 18px;
  }
`
