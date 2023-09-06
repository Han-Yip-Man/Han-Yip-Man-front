import React, { useState } from 'react'
import styled from '@emotion/styled'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface OptionItemType {
  itemId: number
  itemName: string
  itemPrice: number
  isEditing?: boolean
}

interface OptionType {
  optionId: number
  optionName: string
  isMultiple: boolean
  optionItem: OptionItemType[]
  isEditing?: boolean
}

interface MenumanagementProps {
  setMenupage: (value: number) => void
}

const Menumanagement: React.FC<MenumanagementProps> = ({ setMenupage }) => {
  const [menuCategory, setMenuCategory] = useState<string | unknown>('뼈치킨')
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleSelectMenuCategory = (e: SelectChangeEvent<string | unknown>) => {
    setMenuCategory(e.target.value)
  }

  const [options, setOptions] = useState<Array<OptionType>>([
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

  const handleEditClick = (optionId: number): void => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.optionId === optionId ? { ...option, isEditing: !option.isEditing } : option,
      ),
    )
  }

  const handleDeleteClick = (optionId: number): void => {
    setOptions((prevOptions) => prevOptions.filter((option) => option.optionId !== optionId))
  }

  const handleItemEditClick = (optionId: number, itemId: number): void => {
    setOptions((prevOptions) =>
      prevOptions.map((currentOption) =>
        currentOption.optionId === optionId
          ? {
              ...currentOption,
              optionItem: currentOption.optionItem.map((it) =>
                it.itemId === itemId ? { ...it, isEditing: !it.isEditing } : it,
              ),
            }
          : currentOption,
      ),
    )
  }

  const handleItemDeleteClick = (optionId: number, itemId: number): void => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.optionId === optionId
          ? {
              ...option,
              optionItem: option.optionItem.filter((it) => it.itemId !== itemId),
            }
          : option,
      ),
    )
  }
  return (
    <Wrapper>
      <Navigation>
        <StyleBtn variant="contained" onClick={() => setMenupage(8)}>
          메뉴 추가
        </StyleBtn>
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
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <MenuImg src="img/chicken.jpg" alt="메뉴사진" />
            <Menudescbox>
              <MenuNamebox>
                <MenuName>메뉴이름입니다.</MenuName>
                <MenuPrice>판매가격 : 5,000원</MenuPrice>
              </MenuNamebox>
              <Menudescription>
                메뉴설명 하는곳입니다 음~~ 맛있다~~ 너무맛있는 메뉴~~
              </Menudescription>
            </Menudescbox>
          </AccordionSummary>
          <AccordionDetails>
            <OptionTitle>옵션</OptionTitle>
            {options.map((option) => (
              <div key={option.optionId}>
                <OptionNamebox>
                  {option.isEditing ? (
                    <input
                      type="text"
                      value={option.optionName}
                      onChange={(e) =>
                        setOptions((prevOptions) =>
                          prevOptions.map((opt) =>
                            opt.optionId === option.optionId
                              ? { ...opt, optionName: e.target.value }
                              : opt,
                          ),
                        )
                      }
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleEditClick(option.optionId)
                        }
                      }}
                    />
                  ) : (
                    <h2>{option.optionName}</h2>
                  )}
                  <Stylespan isMultiple={option.isMultiple}>
                    (다중선택: {option.isMultiple ? '가능' : '불가능'})
                  </Stylespan>
                  <StyleImg
                    src="img/optionedit.svg"
                    alt=""
                    onClick={() => handleEditClick(option.optionId)}
                  />
                  <StyleImg
                    src="img/optiondelete.svg"
                    alt=""
                    onClick={() => handleDeleteClick(option.optionId)}
                  />
                </OptionNamebox>
                <Itemul>
                  {option.optionItem.map((item) => (
                    <OptionItem key={item.itemId}>
                      {item.isEditing ? (
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) =>
                            setOptions((prevOptions) =>
                              prevOptions.map((currentOption) =>
                                currentOption.optionId === option.optionId
                                  ? {
                                      ...currentOption,
                                      optionItem: currentOption.optionItem.map((it) =>
                                        it.itemId === item.itemId
                                          ? { ...it, itemName: e.target.value }
                                          : it,
                                      ),
                                    }
                                  : currentOption,
                              ),
                            )
                          }
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleItemEditClick(option.optionId, item.itemId)
                            }
                          }}
                        />
                      ) : (
                        <p>{item.itemName}</p>
                      )}
                      <OptionBtnBox>
                        <p>({item.itemPrice}원)</p>
                        <StyleImg
                          src="img/optionedit.svg"
                          alt=""
                          onClick={() => handleItemEditClick(option.optionId, item.itemId)}
                        />
                        <StyleImg
                          src="img/optiondelete.svg"
                          alt=""
                          onClick={() => handleItemDeleteClick(option.optionId, item.itemId)}
                        />
                      </OptionBtnBox>
                    </OptionItem>
                  ))}
                </Itemul>
              </div>
            ))}
          </AccordionDetails>
        </StyleAccordion>
      </MenuItemWrapper>
    </Wrapper>
  )
}

export default Menumanagement

const Stylespan = styled.span<{ isMultiple: boolean }>`
  font-size: 15px;
  margin: 0 20px 0 10px;
  color: ${(props) => (props.isMultiple ? 'blue' : 'red')};
`

const StyleImg = styled.img`
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    filter: invert(52%) sepia(91%) saturate(2957%) hue-rotate(7deg) brightness(98%) contrast(101%);
  }
`

const OptionTitle = styled(Typography)`
  font-size: 20px;
`

const OptionBtnBox = styled.div`
  display: flex;
  p {
    margin-right: 30px;
  }
`

const Itemul = styled.ul`
  margin-left: 30px;
`

const OptionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-bottom: 3px;
`

const OptionNamebox = styled.h2`
  display: flex;
  margin: 18px 0 10px 0;
  align-items: center;
  font-size: 20px;
`

const StyleAccordion = styled(Accordion)`
  margin-bottom: 20px;
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
