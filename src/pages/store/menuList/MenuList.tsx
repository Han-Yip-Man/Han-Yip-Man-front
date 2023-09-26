import { List, ListItem, ListItemButton } from '@mui/material'
import { MenuCard } from '../menuCard/MenuCard'
import { menuInfo } from '../types'
import { useRouter } from '../../../hooks'

type MenuListProps = {
  menuList: menuInfo[]
}

export default function MenuList({ menuList }: MenuListProps) {
  const { routeTo } = useRouter()
  const handleToggle = (menuId: number) => () => {
    routeTo(`/menuDetail/${menuId}`)
  }

  return (
    <List>
      {menuList.map((menu) => {
        return (
          <ListItem key={menu.menuId} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(menu.menuId)} dense>
              <MenuCard menu={menu} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
