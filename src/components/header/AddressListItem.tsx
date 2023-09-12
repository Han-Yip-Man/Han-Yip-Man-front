import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'

function AddressListItem() {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <LocationOnIcon />
      </ListItemIcon>
      <ListItemText primary="푸르지오그랑블" secondary="분당구 동판교로 123" />
      <CurrentAddr>현재 주소</CurrentAddr>
    </ListItem>
  )
}

export default AddressListItem

const CurrentAddr = styled.div`
  color: orange;
`
