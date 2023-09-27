import styled from '@emotion/styled'

export const ShowModalButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 0;
  border: 1px solid #c2bcbf; /* #e5e5e5; */
  background-color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
`

export const Dialog = styled.dialog`
  position: relative;
  width: 45vw;
  height: 40vh;
  background-color: white;
  border-radius: 20px;
  border: none;
  &::backdrop {
    background-color: rgb(194, 188, 191, 0.75);
  }
`
// 박스 입체감 추후작업

export const XButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
`

export const XCloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    max-width: none;
    max-height: none;
  }
`

export const CpnEnrollWrapper = styled.div`
  margin-top: 30px;
  margin-left: 35px;
  display: flex;
  width: 380px;
  justify-content: space-between;
`

export const CpnNumInput = styled.input`
  width: 270px;
  height: 45px;
  padding-left: 10px;
  border: none;
  background-color: rgb(214, 206, 206);
  border-radius: 10px;
  outline: none;
`

export const CpnNumEnrollButton = styled.button`
  width: 90px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid rgb(214, 206, 206);
  cursor: pointer;
`

export const WelcomeCpnWrapper = styled.div`
  display: flex;
  width: 380px;
  margin-top: 15px;
  margin-left: 35px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgb(214, 206, 206);
`

export const WelCpnContentWrapDiv = styled.div`
  width: 250px;
  margin-right: 40px;
`

export const WelCpnContentWrapLabel = styled.label`
  cursor: pointer;
`

export const CpnPriceDiv = styled.div`
  font-size: 30px;
  padding-bottom: 5px;
`
export const CpnNameDiv = styled.div`
  font-size: 22px;
  padding-bottom: 3px;
`
export const CpnExpireDiv = styled.div`
  font-size: 16px;
  padding-bottom: 3px;
  color: gray;
`
export const MinOrderPriceDiv = styled.div`
  font-size: 16px;
  color: gray;
`

export const WelCpnCheckInput = styled.input`
  cursor: pointer;
  width: 20px;
`

export const CpnUseWrapper = styled.div`
  margin-top: 15px;
  margin-left: 35px;
`

export const CpnUseButton = styled.button<{ disabled?: boolean }>`
  width: 380px;
  height: 45px;
  border: none;
  color: white;
  background-color: ${(props) => (props.disabled ? '#a7a4a4' : '#7f9bcf;')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
