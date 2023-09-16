import React, { useEffect, useState } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import * as S from './Menumanagement.style'
import { useRecoilValue } from 'recoil'
import { shopGroupid } from '../../../recoil/restaurants'
import { getsellerMenu } from '../../../api/restaurant'
import { MenuType } from '../../../types/sellermenu'

const Menumanagement = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const groupid = useRecoilValue(shopGroupid)
  const [menu, setMenu] = useState<MenuType[]>([])

  useEffect(() => {
    if (groupid !== undefined) {
      getsellerMenu(groupid)
        .then((response) => {
          setMenu(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [groupid])

  console.log(menu)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleEditClick = (menuId: number, optionId: number): void => {
    setMenu((prevMenu) =>
      prevMenu.map((menu) =>
        menu.menuId === menuId
          ? {
              ...menu,
              options: menu.options.map((option) =>
                option.optionId === optionId ? { ...option, isEditing: !option.isEditing } : option,
              ),
            }
          : menu,
      ),
    )
  }

  const handleDeleteClick = (menuId: number, optionId: number): void => {
    setMenu((prevMenu) =>
      prevMenu.map((menu) =>
        menu.menuId === menuId
          ? {
              ...menu,
              options: menu.options.filter((option) => option.optionId !== optionId),
            }
          : menu,
      ),
    )
  }

  const handleItemEditClick = (menuId: number, optionId: number, optionItemId: number): void => {
    setMenu((prevMenu) =>
      prevMenu.map((menu) =>
        menu.menuId === menuId
          ? {
              ...menu,
              options: menu.options.map((option) =>
                option.optionId === optionId
                  ? {
                      ...option,
                      optionItems: option.optionItems.map((item) =>
                        item.optionItemId === optionItemId
                          ? { ...item, isEditing: !item.isEditing }
                          : item,
                      ),
                    }
                  : option,
              ),
            }
          : menu,
      ),
    )
  }

  const handleItemDeleteClick = (menuId: number, optionId: number, optionItemId: number): void => {
    setMenu((prevMenu) =>
      prevMenu.map((menu) =>
        menu.menuId === menuId
          ? {
              ...menu,
              options: menu.options.map((option) =>
                option.optionId === optionId
                  ? {
                      ...option,
                      optionItems: option.optionItems.filter(
                        (item) => item.optionItemId !== optionItemId,
                      ),
                    }
                  : option,
              ),
            }
          : menu,
      ),
    )
  }

  return (
    <S.Wrapper>
      <S.MenuItemWrapper>
        {menu.map((menuitem, index) => (
          <S.StyleAccordion
            key={menuitem.menuId}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <S.MenuImg src={menuitem.menuThumbnailUrl} alt="메뉴사진" />
              <S.Menudescbox>
                <S.MenuNamebox>
                  <S.MenuName>{menuitem.menuName}</S.MenuName>
                  <S.MenuPrice>{menuitem.menuPrice}</S.MenuPrice>
                </S.MenuNamebox>
                <S.Menudescription>{menuitem.menuDescription}</S.Menudescription>
              </S.Menudescbox>
            </AccordionSummary>
            <AccordionDetails>
              <S.OptionTitle>옵션</S.OptionTitle>
              {menuitem.options.map((option) => (
                <div key={option.optionId}>
                  <S.OptionNamebox>
                    {option.isEditing ? (
                      <input
                        type="text"
                        value={option.optionName}
                        onChange={(e) =>
                          setMenu((prevMenu) =>
                            prevMenu.map((currentMenu) =>
                              currentMenu.menuId === menuitem.menuId
                                ? {
                                    ...currentMenu,
                                    options: currentMenu.options.map((opt) =>
                                      opt.optionId === option.optionId
                                        ? { ...opt, optionName: e.target.value }
                                        : opt,
                                    ),
                                  }
                                : currentMenu,
                            ),
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleEditClick(menuitem.menuId, option.optionId)
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
                      onClick={() => handleEditClick(menuitem.menuId, option.optionId)}
                    />
                    <S.StyleImg
                      src="/img/optiondelete.svg"
                      alt=""
                      onClick={() => handleDeleteClick(menuitem.menuId, option.optionId)}
                    />
                  </S.OptionNamebox>
                  <S.Itemul>
                    {option.optionItems.map((item) => (
                      <S.OptionItem key={item.optionItemId}>
                        {item.isEditing ? (
                          <input
                            type="text"
                            value={item.optionItemName}
                            onChange={(e) =>
                              setMenu((prevMenu): MenuType[] =>
                                prevMenu.map((currentMenu) =>
                                  currentMenu.menuId === menuitem.menuId
                                    ? {
                                        ...currentMenu,
                                        options: currentMenu.options.map((currentOption) =>
                                          currentOption.optionId === option.optionId
                                            ? {
                                                ...currentOption,
                                                optionItems: currentOption.optionItems.map((it) =>
                                                  it.optionItemId === item.optionItemId
                                                    ? { ...it, optionItemName: e.target.value }
                                                    : it,
                                                ),
                                              }
                                            : currentOption,
                                        ),
                                      }
                                    : currentMenu,
                                ),
                              )
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleItemEditClick(
                                  menuitem.menuId,
                                  option.optionId,
                                  item.optionItemId,
                                )
                              }
                            }}
                          />
                        ) : (
                          <p>{item.optionItemName}</p>
                        )}
                        <S.OptionBtnBox>
                          <p>({item.optionItemPrice}원)</p>
                          <S.StyleImg
                            src="/img/optionedit.svg"
                            alt=""
                            onClick={() =>
                              handleItemEditClick(
                                menuitem.menuId,
                                option.optionId,
                                item.optionItemId,
                              )
                            }
                          />
                          <S.StyleImg
                            src="/img/optiondelete.svg"
                            alt=""
                            onClick={() =>
                              handleItemDeleteClick(
                                menuitem.menuId,
                                option.optionId,
                                item.optionItemId,
                              )
                            }
                          />
                        </S.OptionBtnBox>
                      </S.OptionItem>
                    ))}
                  </S.Itemul>
                </div>
              ))}
            </AccordionDetails>
          </S.StyleAccordion>
        ))}
      </S.MenuItemWrapper>
    </S.Wrapper>
  )
}

export default Menumanagement
