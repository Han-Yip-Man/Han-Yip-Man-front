import React from 'react'
import { Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import * as S from './RestaurantsTabController.style'
import { useRecoilValue } from 'recoil'
import { selectedShopNameState } from '../../../recoil/restaurants'

type TabControllerProps = {
  setMenupage: React.Dispatch<React.SetStateAction<number>>
}

const RestaurantsTabController: React.FC<TabControllerProps> = ({ setMenupage }) => {
  const selectedShopName = useRecoilValue(selectedShopNameState)

  return (
    <S.Wrapper>
      <S.StyledTabTitle>{selectedShopName}</S.StyledTabTitle>
      <S.StyledAccordion>
        <S.StlyedAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>가게관리</Typography>
        </S.StlyedAccordionSummary>
        <S.StyledAccordionDetails>
          <Typography onClick={() => setMenupage(1)}>가게관리</Typography>
        </S.StyledAccordionDetails>
        <S.StyledAccordionDetails>
          <Typography onClick={() => setMenupage(2)}>메뉴 대분류 관리</Typography>
        </S.StyledAccordionDetails>
        <S.StyledAccordionDetails>
          <Typography onClick={() => setMenupage(3)}>메뉴 관리</Typography>
        </S.StyledAccordionDetails>
      </S.StyledAccordion>
      <S.STyledTabmenu onClick={() => setMenupage(4)}>주문관리</S.STyledTabmenu>
      <S.STyledTabmenu onClick={() => setMenupage(5)}>판매내역</S.STyledTabmenu>
    </S.Wrapper>
  )
}

export default RestaurantsTabController
