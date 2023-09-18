import { List, ListItem, ListItemButton } from '@mui/material'
import { MenuCard } from './MenuCard'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const handleToggle = (menuId: number) => () => {
    navigate(`/menuDetail/${menuId}`) //temp
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
