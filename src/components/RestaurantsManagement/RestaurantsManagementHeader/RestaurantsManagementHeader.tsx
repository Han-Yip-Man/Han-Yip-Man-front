import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'
import { useEffect } from 'react'
import * as S from './RestaurantsManagementHeader.style'
import { useRecoilValue } from 'recoil'
import { shopListState } from '../../../recoil/restaurants'
import { useRecoilState } from 'recoil'
import { selectedShopIdState } from '../../../recoil/restaurants'

const RestaurantsManagementHeader = () => {
  const shopList = useRecoilValue(shopListState)
  const [selectedShopId, setSelectedShopId] = useRecoilState(selectedShopIdState || undefined)

  const handlemyRestaurants = (e: SelectChangeEvent<unknown>, _child: React.ReactNode) => {
    if (typeof e.target.value === 'number') {
      setSelectedShopId(e.target.value)
    }
  }

  useEffect(() => {
    if (shopList?.length > 0) {
      setSelectedShopId(shopList[0].shopId)
    }
  }, [shopList])

  const selectedShop =
    shopList && shopList.length > 0 ? shopList.find((shop) => shop.shopId === selectedShopId) : null

  return (
    <S.Wrapper>
      <S.CenteredDiv>{selectedShop?.name}</S.CenteredDiv>
      <S.StyledSelect
        id="demo-simple-select"
        value={selectedShopId || ''}
        onChange={handlemyRestaurants}
      >
        {shopList &&
          shopList.map((shop) => (
            <MenuItem key={shop.shopId} value={shop.shopId}>
              {shop.name}
            </MenuItem>
          ))}
      </S.StyledSelect>
    </S.Wrapper>
  )
}

export default RestaurantsManagementHeader
