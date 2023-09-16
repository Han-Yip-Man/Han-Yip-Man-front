import styled from '@emotion/styled'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'

export const Stylespan = styled.span<{ isMultiple: boolean }>`
  font-size: 15px;
  margin: 0 20px 0 10px;
  color: ${(props) => (props.isMultiple ? 'blue' : 'red')};
`

export const StyleImg = styled.img`
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    filter: invert(52%) sepia(91%) saturate(2957%) hue-rotate(7deg) brightness(98%) contrast(101%);
  }
`

export const OptionTitle = styled(Typography)`
  font-size: 20px;
`

export const OptionBtnBox = styled.div`
  display: flex;
  p {
    margin-right: 30px;
  }
`

export const Itemul = styled.ul`
  margin-left: 30px;
`

export const OptionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-bottom: 3px;
`

export const OptionNamebox = styled.h3`
  display: flex;
  margin: 18px 0 10px 0;
  align-items: center;
  font-size: 20px;
`

export const StyleAccordion = styled(Accordion)`
  margin-bottom: 20px;
  width: 650px;
  /* &.Mui-expanded {
    margin: 0;
  } */
`

export const Menudescbox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 15px 50px 10px 20px;
  width: 100%;
`

export const Menudescription = styled.p`
  margin-top: 20px;
`

export const MenuNamebox = styled.div`
  display: flex;
  justify-content: space-between;
`

export const MenuName = styled.h3`
  font-weight: bold;
  font-size: 20px;
`

export const MenuPrice = styled.div`
  font-weight: 500;
`

export const MenuImg = styled.img`
  width: 130px;
  height: 130px;
`

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const MenuItemWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`
