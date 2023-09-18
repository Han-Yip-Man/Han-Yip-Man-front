import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Button, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { currentAddr, userAddr } from '../../atoms/addressAtoms'
import { useAlert } from '../../hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { delUserAddr, setDefaultAddr } from '../../api/address'

interface Props extends CurrentAddr {
  isLoggedIn: any
  addressId?: number
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
  addressId,
}: Props) {
  const [nonAddrList, setNonAddrList] = useRecoilState(currentAddr)
  const setCurrentAddr = useSetRecoilState(userAddr)
  const toast = useAlert()
  const delMutation = useMutation(delUserAddr)
  const setDefaultMutation = useMutation(setDefaultAddr)
  const qc = useQueryClient()

  const handleDelete = () => {
    if (isLoggedIn) {
      // 주소 id로 삭제 요청
      if (addressId) {
        delMutation
          .mutateAsync(addressId) //
          .then((res) => {
            qc.invalidateQueries(['modalAddr'])
            toast(res.message, 3000, 'info')
          })
          .catch((e) => {
            toast(e.response.data.message, 3000, 'error')
          })
      }
    } else {
      if (nonAddrList.length === 1) {
        toast('주소가 하나 남아 지울 수 없습니다.', 3000, 'warning')
        return
      }

      const filtered = nonAddrList.filter((addr) => addr.id !== id)
      const isExist = filtered.filter((addr) => addr.isDefault)

      if (isExist.length > 0) {
        setNonAddrList(filtered)
      } else {
        const setDefault = filtered.map((addr, i) =>
          i === 0 ? { ...addr, isDefault: true } : addr,
        )

        setCurrentAddr(setDefault[0])
        setNonAddrList(setDefault)
      }
    }
  }

  const handleDefault = () => {
    if (isLoggedIn) {
      if (addressId) {
        setDefaultMutation
          .mutateAsync(addressId) //
          .then((res) => {
            qc.invalidateQueries(['modalAddr'])
            toast(res.message, 3000, 'success')
          })
      }
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
