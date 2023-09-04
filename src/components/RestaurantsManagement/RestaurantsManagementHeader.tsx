import styled from '@emotion/styled'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

const RestaurantsManagementHeader = () => {
  const [myRestaurants, setmyRestaurants] = useState<string | null>('티엔미미 - 신촌점')

  const handlemyRestaurants = (e: SelectChangeEvent<unknown>, _child: React.ReactNode) => {
    if (typeof e.target.value === 'string') {
      setmyRestaurants(e.target.value)
    }
  }

  return (
    <Wrapper>
      <CenteredDiv>{myRestaurants}</CenteredDiv>
      <StyledSelect id="demo-simple-select" value={myRestaurants} onChange={handlemyRestaurants}>
        <MenuItem value="티엔미미 - 신촌점">티엔미미 - 신촌점</MenuItem>
        <MenuItem value="롯데리아 - 은평점">롯데리아 - 은평점</MenuItem>
        <MenuItem value="이마트 - 부산점">이마트 - 부산점</MenuItem>
      </StyledSelect>
    </Wrapper>
  )
}

export default RestaurantsManagementHeader

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ea7600;
  color: #fff;
  display: flex;
  align-items: center;
`
const CenteredDiv = styled.div`
  flex: 1;
  text-align: center;
  font-size: 28px;
`

const StyledSelect = styled(Select)`
  margin-left: auto;
  margin-right: 20px;
  background-color: #fff;
  &.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }
  label {
    opacity: 1;
  }
`
