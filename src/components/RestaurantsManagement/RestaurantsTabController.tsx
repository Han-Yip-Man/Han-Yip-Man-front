import React from 'react'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type TabControllerProps = {
  setMenupage: React.Dispatch<React.SetStateAction<number>>
}

const RestaurantsTabController: React.FC<TabControllerProps> = ({ setMenupage }) => {
  return (
    <Wrapper>
      <StyledTabTitle>티엔미미 - 신촌점</StyledTabTitle>
      <StyledAccordion>
        <StlyedAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>가게관리</Typography>
        </StlyedAccordionSummary>
        <StyledAccordionDetails>
          <Typography onClick={() => setMenupage(1)}>가게관리</Typography>
        </StyledAccordionDetails>
        <StyledAccordionDetails>
          <Typography onClick={() => setMenupage(2)}>메뉴 대분류 관리</Typography>
        </StyledAccordionDetails>
        <StyledAccordionDetails>
          <Typography onClick={() => setMenupage(3)}>메뉴 관리</Typography>
        </StyledAccordionDetails>
      </StyledAccordion>
      <STyledTabmenu onClick={() => setMenupage(4)}>주문관리</STyledTabmenu>
      <STyledTabmenu onClick={() => setMenupage(5)}>판매내역</STyledTabmenu>
    </Wrapper>
  )
}

export default RestaurantsTabController

const Wrapper = styled.div`
  width: 220px;
  height: 100%;
  background-color: #f2cd00;
  border: 1px solid #f2cd00;
`

const StlyedAccordionSummary = styled(AccordionSummary)`
  height: 60px;
  &:hover {
    transition: all 0.3s;
    background-color: #ea7600;
    color: #fff;
  }
  .MuiTypography-root {
    font-size: 18px;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }
`

const StyledAccordionDetails = styled(AccordionDetails)`
  cursor: pointer;
  height: 60px;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  .MuiTypography-root {
    font-size: 18px;
    line-height: 42px;
    text-align: center;
  }
  &:hover {
    transition: all 0.3s;
    background-color: #ea7600;
    color: #fff;
  }
`
const StyledAccordion = styled(Accordion)`
  border-radius: 0 !important;
  font-size: 20px;
  box-shadow: none;
  &.Mui-expanded {
    margin: 0;
  }
`

const StyledTabTitle = styled.div`
  height: 80px;
  width: 100%;
  text-align: center;
  line-height: 80px;
  font-weight: bold;
  font-size: 20px;
`

const STyledTabmenu = styled.div`
  height: 60px;
  width: 100%;
  text-align: center;
  line-height: 60px;
  background-color: #fff;
  font-size: 20px;
  margin: 15px 0;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background-color: #ea7600;
    color: #fff;
  }
`
