import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Button, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { currentAddr, userAddr } from '../../atoms/addressAtoms'
import useAlert from '../../hooks/useAlert'

interface Props extends CurrentAddr {
  isLoggedIn: any
}

function AddressListItem({
  id,
  address,
  road_address,
  isDefault,
  place_name,
  lat,
  lng,
  isLoggedIn,
}: Props) {
  const [nonAddrList, setNonAddrList] = useRecoilState(currentAddr)
  const setCurrentAddr = useSetRecoilState(userAddr)
  const handleAlert = useAlert()

  const handleDelete = () => {
    if (nonAddrList.length === 1) {
      handleAlert('주소가 하나 남아 지울 수 없습니다.', 3000, 'warning')
      return
    }
    if (isLoggedIn) {
      // 주소 id로 삭제 요청
    } else {
      const filteredAddr = nonAddrList.filter((addr) => addr.id !== id)
      const existsDefault = filteredAddr.filter((addr) => addr.isDefault)
      if (existsDefault.length > 0) {
        setNonAddrList(filteredAddr)
      } else {
        const setDefault = filteredAddr.map((addr, i) =>
          i === 0 ? { ...addr, isDefault: true } : addr,
        )
        setCurrentAddr(() => setDefault[0])
        setNonAddrList(() => setDefault)
      }
    }
  }

  const handleDefault = () => {
    if (isLoggedIn) {
      // default 설정 api 요청
    } else {
      const mappedAddr = nonAddrList.map((addr) => {
        if (addr.isDefault) {
          return { ...addr, isDefault: false }
        }
        if (addr.id === id) {
          return { ...addr, isDefault: true }
        }
        return addr
      })

      setCurrentAddr(mappedAddr.filter((addr) => addr.isDefault)[0])
      setNonAddrList(mappedAddr)
    }
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <LocationOnIcon />
      </ListItemIcon>
      <ListItemText primary={place_name} secondary={road_address} />
      <CurrentAddr>
        {isDefault ? (
          <CustomTypo>현재 주소</CustomTypo>
        ) : (
          <CustomBtn onClick={handleDefault}>기본주소 등록</CustomBtn>
        )}
      </CurrentAddr>
    </ListItem>
  )
}

export default AddressListItem

const CurrentAddr = styled.div`
  color: orange;
`
const CustomTypo = styled(Typography)`
  color: green;
`
const CustomBtn = styled(Button)``
