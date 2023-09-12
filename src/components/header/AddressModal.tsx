import styled from '@emotion/styled'
import { Typography, TextField, Autocomplete, Button, List } from '@mui/material'

import AddressListItem from './AddressListItem'

function AddressModal() {
  return (
    <Wrap>
      <Header>
        <Title>
          <Typography>주소 설정</Typography>
        </Title>
        <Search>
          <Autocomplete
            sx={{ width: '100%' }}
            freeSolo
            disableClearable
            loading={true}
            id="address"
            options={['']} // top100Films.map((option) => option.title) 이런식으로 주소검색 데이터 받아와서 옵션 그려줌
            renderInput={(param) => (
              <TextField {...param} label="주소 입력" placeholder="지번,도로명,건물명으로 검색" />
            )}
          />
          <CustomBtn variant="outlined">등록</CustomBtn>
        </Search>
      </Header>
      <List dense={true}>
        <AddressListItem />
        <AddressListItem />
        <AddressListItem />
        <AddressListItem />
        <AddressListItem />
        <AddressListItem />
        <AddressListItem />
        <AddressListItem />
      </List>
    </Wrap>
  )
}

export default AddressModal

const Wrap = styled.div`
  min-height: 500px;
  max-height: 500px;
  width: 400px;
  position: relative;
`
const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
  padding-bottom: 10px;
`

const Title = styled.div`
  display: grid;
  place-items: center;
  padding-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
`
const Search = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  padding-left: 10px;
  padding-right: 10px;
  place-items: center;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;

  & label.Mui-focused {
    color: black;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`
const CustomBtn = styled(Button)`
  color: black;
  border-color: black;

  &:hover,
  &:active {
    border: 1px solid black;
  }
`
