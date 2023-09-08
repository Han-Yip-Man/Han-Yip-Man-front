import React, { useState } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { MenuItem, SelectChangeEvent } from '@mui/material'
import * as S from './Menumanagement.style'

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
    <S.Wrapper>
      <S.Navigation>
        <S.StyleBtn variant="contained" onClick={() => setMenupage(8)}>
          메뉴 추가
        </S.StyleBtn>
        <S.StyleSelect value={menuCategory} onChange={handleSelectMenuCategory}>
          <MenuItem value="뼈치킨">뼈치킨</MenuItem>
          <MenuItem value="순살치킨">순살치킨</MenuItem>
          <MenuItem value="특수부위">특수부위</MenuItem>
          <MenuItem value="사이드메뉴">사이드메뉴</MenuItem>
          <MenuItem value="음료 & 주류">음료 & 주류</MenuItem>
          <MenuItem value="공기밥">공기밥</MenuItem>
        </S.StyleSelect>
      </S.Navigation>
      <S.MenuItemWrapper>
        <S.StyleAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <S.MenuImg src="/img/chicken.jpg" alt="메뉴사진" />
            <S.Menudescbox>
              <S.MenuNamebox>
                <S.MenuName>메뉴이름입니다.</S.MenuName>
                <S.MenuPrice>판매가격 : 5,000원</S.MenuPrice>
              </S.MenuNamebox>
              <S.Menudescription>
                메뉴설명 하는곳입니다 음~~ 맛있다~~ 너무맛있는 메뉴~~
              </S.Menudescription>
            </S.Menudescbox>
          </AccordionSummary>
          <AccordionDetails>
            <S.OptionTitle>옵션</S.OptionTitle>
            {options.map((option) => (
              <div key={option.optionId}>
                <S.OptionNamebox>
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
                    <div>{option.optionName}</div>
                  )}
                  <S.Stylespan isMultiple={option.isMultiple}>
                    (다중선택: {option.isMultiple ? '가능' : '불가능'})
                  </S.Stylespan>
                  <S.StyleImg
                    src="/img/optionedit.svg"
                    alt=""
                    onClick={() => handleEditClick(option.optionId)}
                  />
                  <S.StyleImg
                    src="/img/optiondelete.svg"
                    alt=""
                    onClick={() => handleDeleteClick(option.optionId)}
                  />
                </S.OptionNamebox>
                <S.Itemul>
                  {option.optionItem.map((item) => (
                    <S.OptionItem key={item.itemId}>
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
                      <S.OptionBtnBox>
                        <p>({item.itemPrice}원)</p>
                        <S.StyleImg
                          src="/img/optionedit.svg"
                          alt=""
                          onClick={() => handleItemEditClick(option.optionId, item.itemId)}
                        />
                        <S.StyleImg
                          src="/img/optiondelete.svg"
                          alt=""
                          onClick={() => handleItemDeleteClick(option.optionId, item.itemId)}
                        />
                      </S.OptionBtnBox>
                    </S.OptionItem>
                  ))}
                </S.Itemul>
              </div>
            ))}
          </AccordionDetails>
        </S.StyleAccordion>
      </S.MenuItemWrapper>
    </S.Wrapper>
  )
}

export default Menumanagement
