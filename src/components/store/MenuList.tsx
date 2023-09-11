import { List, ListItem, ListItemButton } from '@mui/material'
import { MenuCard } from './MenuCard'

export default function MenuList() {
  const menus = [0, 1, 2, 3]
  const handleToggle = (value: number) => () => {
    console.log('메뉴상세로', value)
  }

  return (
    <List>
      {menus.map((value) => {
        return (
          <ListItem key={value} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <MenuCard />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
