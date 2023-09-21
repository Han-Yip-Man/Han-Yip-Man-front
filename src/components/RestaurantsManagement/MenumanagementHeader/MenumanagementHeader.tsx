import * as S from './MenumanagementHeader.style'
import { MenuItem } from '@mui/material'
import { useEffect } from 'react'
import { getMenuGroups, getsellerMenu } from '../../../api/restaurant'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import {
  selectedShopIdState,
  shopMenuGroups,
  shopGroupid,
  shopmenupage,
  shopMenu,
} from '../../../recoil/restaurants'
import { SelectChangeEvent } from '@mui/material'

const MenumanagementHeader = () => {
  const currentId = useRecoilValue(selectedShopIdState)
  const [menugroup, setMenugroup] = useRecoilState(shopMenuGroups)
  const [groupid, setGroupid] = useRecoilState(shopGroupid)
  const [menupage, menupageset] = useRecoilState(shopmenupage)
  const setMenu = useSetRecoilState(shopMenu)

  useEffect(() => {
    const getCate = () => {
      getMenuGroups(currentId)
        .then((response) => {
          setMenugroup(response)
          setGroupid(response[0]?.menuGroupId)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    getCate()
  }, [currentId])

  useEffect(() => {
    if (groupid !== undefined) {
      getsellerMenu(groupid)
        .then((response) => {
          setMenu(response)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setMenu([])
    }
  }, [groupid])

  const handleSelectMenuCategory = (e: SelectChangeEvent<string | unknown>) => {
    setGroupid(e.target.value as number)
  }

  return (
    <>
      {groupid && (
        <S.Navigation>
          {menupage === 1 ? (
            <S.StyleBtn variant="contained" onClick={() => menupageset(2)}>
              메뉴 추가
            </S.StyleBtn>
          ) : (
            <S.StyleBtn variant="contained" onClick={() => menupageset(1)}>
              뒤로가기
            </S.StyleBtn>
          )}
          <S.StyleSelect value={groupid} onChange={handleSelectMenuCategory}>
            {menugroup?.map((item) => (
              <MenuItem key={item.menuGroupId} value={item.menuGroupId}>
                {item.menuGroupName}
              </MenuItem>
            ))}
          </S.StyleSelect>
        </S.Navigation>
      )}
    </>
  )
}

export default MenumanagementHeader
