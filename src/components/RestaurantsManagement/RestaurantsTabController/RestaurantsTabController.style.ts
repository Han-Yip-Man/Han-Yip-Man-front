import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

export const Wrapper = styled.div`
  width: 220px;
  height: 100%;
  background-color: #f2cd00;
  border: 1px solid #f2cd00;
`

export const StlyedAccordionSummary = styled(AccordionSummary)`
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

export const StyledAccordionDetails = styled(AccordionDetails)`
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
export const StyledAccordion = styled(Accordion)`
  border-radius: 0 !important;
  font-size: 20px;
  box-shadow: none;
  &.Mui-expanded {
    margin: 0;
  }
`

export const StyledTabTitle = styled.div`
  height: 80px;
  width: 100%;
  text-align: center;
  line-height: 80px;
  font-weight: bold;
  font-size: 20px;
`

export const STyledTabmenu = styled.div`
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
