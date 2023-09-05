import React, { useState } from 'react'
import styled from '@emotion/styled'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material'

const Menumanagement = () => {
  const [menuCategory, setMenuCategory] = useState<string | unknown>('뼈치킨')
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleSelectMenuCategory = (e: SelectChangeEvent<unknown>) => {
    setMenuCategory(e.target.value)
  }

  const [options, setOptions] = useState([
    {
      optionId: 1,
      optionName: '크기',
      isMultiple: false,
      optionItem: [
        {
          itemId: 1,
          itemName: '소',
          itemPrice: 10000,
        },
        {
          itemId: 2,
          itemName: '중',
          itemPrice: 15000,
        },
        {
          itemId: 3,
          itemName: '대',
          itemPrice: 20000,
        },
      ],
    },
    {
      optionId: 2,
      optionName: '토핑',
      isMultiple: true,
      optionItem: [
        {
          itemId: 4,
          itemName: '페퍼로니',
          itemPrice: 2000,
        },
        {
          itemId: 5,
          itemName: '버섯',
          itemPrice: 1000,
        },
        {
          itemId: 6,
          itemName: '파인애플',
          itemPrice: 1500,
        },
      ],
    },
  ])

  const handleEditClick = (optionId) => {
    setOptions((prevOptions) => prevOptions.map((option) => (option.optionId === optionId ? { ...option, isEditing: !option.isEditing } : option)))
  }

  const handleDeleteClick = (optionId) => {
    setOptions((prevOptions) => prevOptions.filter((option) => option.optionId !== optionId))
  }

  return (
    <Wrapper>
      <Navigation>
        <StyleBtn variant="contained">메뉴 추가</StyleBtn>
        <StyleSelect value={menuCategory} onChange={handleSelectMenuCategory}>
          <MenuItem value="뼈치킨">뼈치킨</MenuItem>
          <MenuItem value="순살치킨">순살치킨</MenuItem>
          <MenuItem value="특수부위">특수부위</MenuItem>
          <MenuItem value="사이드메뉴">사이드메뉴</MenuItem>
          <MenuItem value="음료 & 주류">음료 & 주류</MenuItem>
          <MenuItem value="공기밥">공기밥</MenuItem>
        </StyleSelect>
      </Navigation>
      <MenuItemWrapper>
        <StyleAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <MenuImg src="img/chicken.jpg" alt="메뉴사진" />
            <Menudescbox>
              <MenuNamebox>
                <MenuName>메뉴이름입니다.</MenuName>
                <MenuPrice>판매가격 : 5,000원</MenuPrice>
              </MenuNamebox>
              <Menudescription>메뉴설명 하는곳입니다 음~~ 맛있다~~ 너무맛있는 메뉴~~</Menudescription>
            </Menudescbox>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>옵션</Typography>
            {options.map((option) => (
              <div key={option.optionId}>
                <OptionNamebox>
                  {option.isEditing ? (
                    <input
                      type="text"
                      value={option.optionName}
                      onChange={(e) => setOptions((prevOptions) => prevOptions.map((opt) => (opt.optionId === option.optionId ? { ...opt, optionName: e.target.value } : opt)))}
                    />
                  ) : (
                    <h2>{option.optionName}</h2>
                  )}
                  <span>(다중선택: {option.isMultiple ? '가능' : '불가능'})</span>
                  <img src="img/optionedit.svg" alt="" onClick={() => handleEditClick(option.optionId)} />
                  <img src="img/optiondelete.svg" alt="" onClick={() => handleDeleteClick(option.optionId)} />
                </OptionNamebox>
                <ul>{/* ... 기존 코드 */}</ul>
              </div>
            ))}
          </AccordionDetails>
        </StyleAccordion>
      </MenuItemWrapper>
    </Wrapper>
  )
}

export default Menumanagement

const OptionNamebox = styled.h2`
  display: flex;
  margin-top: 15px;
  align-items: center;
`

const StyleAccordion = styled(Accordion)`
  /* &.Mui-expanded {
    margin: 0;
  } */
`

const Menudescbox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 50px 10px 20px;
  width: 100%;
`

const Menudescription = styled.p`
  margin-top: 20px;
`

const MenuNamebox = styled.div`
  display: flex;
  justify-content: space-between;
`

const MenuName = styled.h3`
  font-weight: bold;
  font-size: 20px;
`

const MenuPrice = styled.div`
  font-weight: 500;
`

const MenuImg = styled.img`
  width: 130px;
  height: 130px;
`

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
`
const Navigation = styled.div`
  height: 60px;
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  padding-right: 30px;
  align-items: center;
`

const StyleBtn = styled(Button)`
  height: 40px;
  width: 100px;
`

const StyleSelect = styled(Select)`
  height: 40px;
  width: 220px;

  /* &.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: red;
  } */
`

const MenuItemWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  height: calc(100% - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`
