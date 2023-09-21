import styled from '@emotion/styled'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

export const Stylespan = styled.span<{ isMultiple: boolean }>`
  font-size: 15px;
  margin: 0 20px 0 10px;
  color: ${(props) => (props.isMultiple ? 'blue' : 'red')};
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
  height: 30px;
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
export const Btnbox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  gap: 30px;
  margin: 20px 0 20px;
`
export const EditBtn = styled(Button)``
export const DeleteBtn = styled(Button)``

// export const OptionName = styled.div`
//   display: flex;
//   gap: 50px;
// `
// export const OptionItemAction = styled.div`
//   display: flex;
//   gap: 10px;
//   width: 25px;
//   height: 25px;
//   cursor: pointer;
//   img {
//     &:hover {
//       transition: all 0.3s;
//       filter: invert(42%) sepia(49%) saturate(5188%) hue-rotate(21deg) brightness(114%)
//         contrast(101%);
//     }
//   }
// `
