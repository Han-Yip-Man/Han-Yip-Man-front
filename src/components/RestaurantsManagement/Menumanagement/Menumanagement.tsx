import React, { useEffect, useState } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import * as S from './Menumanagement.style'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { shopGroupid, shopMenu, shopMenuId, shopMenuEditModal } from '../../../recoil/restaurants'
import { getsellerMenu } from '../../../api/restaurant'
import MenuEditModal from './MenuEditModal'
import { deleteMenu } from '../../../api/shopMenuEdit.api'
import { useAlert } from '../../../hooks'

const Menumanagement = () => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const groupid = useRecoilValue(shopGroupid)
  const [menu, setMenu] = useRecoilState(shopMenu)
  const setmunuId = useSetRecoilState(shopMenuId)
  const setModal = useSetRecoilState(shopMenuEditModal)
  const toast = useAlert()

  useEffect(() => {
    if (groupid !== undefined) {
      getsellerMenu(groupid)
        .then((response) => {
          setMenu(response)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [groupid])

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleModalOpen = (id: number) => {
    setmunuId(id)
    setModal(true)
  }

  const handledeleteMenu = (id: number) => {
    deleteMenu(id)
      .then(() => {
        toast('메뉴가 삭제되었습니다.', 2000, 'success')
        getsellerMenu(groupid)
          .then((response) => {
            setMenu(response)
          })
          .catch(() => {})
      })
      .catch((error) => {
        console.error(error)
        toast('삭제에 실패했습니다.', 2000, 'error')
      })
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
              <S.MenuImg
                src={menuitem.menuThumbnailUrl ? menuitem.menuThumbnailUrl : '/img/fooddefault.jpg'}
                alt="메뉴사진"
              />
              <S.Menudescbox>
                <S.MenuNamebox>
                  <S.MenuName>{menuitem.menuName}</S.MenuName>
                  <S.MenuPrice>{menuitem.menuPrice.toLocaleString('ko-KR') + ' 원'}</S.MenuPrice>
                </S.MenuNamebox>
                <S.Menudescription>{menuitem.menuDescription}</S.Menudescription>
              </S.Menudescbox>
            </AccordionSummary>
            <AccordionDetails>
              <S.OptionTitle>옵션</S.OptionTitle>
              {menuitem.options.map((option) => (
                <div key={option.optionId}>
                  <S.OptionNamebox>
                    <div>{option.optionName}</div>
                    <S.Stylespan isMultiple={option.isMultiple}>
                      (다중선택: {option.isMultiple ? '가능' : '불가능'}
                      {option.isMultiple ? ' - ' + option.maxSelected + '개' : ''})
                    </S.Stylespan>
                  </S.OptionNamebox>
                  <S.Itemul>
                    {option.optionItems.map((item) => (
                      <S.OptionItem key={item.optionItemId}>
                        <p>{item.optionItemName}</p>
                        <S.OptionBtnBox>
                          <p>({item.optionItemPrice}원)</p>
                        </S.OptionBtnBox>
                      </S.OptionItem>
                    ))}
                  </S.Itemul>
                </div>
              ))}
            </AccordionDetails>
            <S.Btnbox>
              <S.EditBtn variant="contained" onClick={() => handleModalOpen(menuitem.menuId)}>
                수정
              </S.EditBtn>
              <S.DeleteBtn
                variant="contained"
                color="error"
                onClick={() => handledeleteMenu(menuitem.menuId)}
              >
                삭제
              </S.DeleteBtn>
            </S.Btnbox>
          </S.StyleAccordion>
        ))}
      </S.MenuItemWrapper>
      <MenuEditModal />
    </S.Wrapper>
  )
}

export default Menumanagement
