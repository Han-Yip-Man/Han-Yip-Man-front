import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'
import * as S from './RestaurantsManagementHeader.style'

const RestaurantsManagementHeader = () => {
  const [myRestaurants, setmyRestaurants] = useState<string | null>('티엔미미 - 신촌점')

  const handlemyRestaurants = (e: SelectChangeEvent<unknown>, _child: React.ReactNode) => {
    if (typeof e.target.value === 'string') {
      setmyRestaurants(e.target.value)
    }
  }

  return (
    <S.Wrapper>
      <S.CenteredDiv>{myRestaurants}</S.CenteredDiv>
      <S.StyledSelect id="demo-simple-select" value={myRestaurants} onChange={handlemyRestaurants}>
        <MenuItem value="티엔미미 - 신촌점">티엔미미 - 신촌점</MenuItem>
        <MenuItem value="롯데리아 - 은평점">롯데리아 - 은평점</MenuItem>
        <MenuItem value="이마트 - 부산점">이마트 - 부산점</MenuItem>
      </S.StyledSelect>
    </S.Wrapper>
  )
}

export default RestaurantsManagementHeader
