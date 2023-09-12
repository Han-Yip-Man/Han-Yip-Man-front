import { List, ListItem, ListItemButton } from '@mui/material'
import { MenuCard } from './MenuCard'

type menuInfo = {
  menuDescription: string
  menuDiscountPrice: number
  menuId: number
  menuName: string
  menuPrice: number
  menuThumbnailUrl: string
}

type MenuListProps = {
  menuList: menuInfo[]
}

export default function MenuList({ menuList }: MenuListProps) {
  const handleToggle = (menuId: number) => () => {
    console.log('메뉴상세로', menuId)
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
