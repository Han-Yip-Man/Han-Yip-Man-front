import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'
import { useEffect } from 'react'
import * as S from './RestaurantsManagementHeader.style'
import { shopListState } from '../../../atoms/restaurantsAtoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  selectedShopIdState,
  selectedShopNameState,
  sellerDashboardNum,
} from '../../../atoms/restaurantsAtoms'

const RestaurantsManagementHeader = () => {
  const shopList = useRecoilValue(shopListState)
  const currentShopName = useRecoilValue(selectedShopNameState)
  const [selectedShopId, setSelectedShopId] = useRecoilState(selectedShopIdState || undefined)
  const pageset = useSetRecoilState(sellerDashboardNum)

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

  return (
    <S.Wrapper>
      <S.CenteredDiv>
        <h2 onClick={() => pageset(1)}>{currentShopName}</h2>
      </S.CenteredDiv>
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
