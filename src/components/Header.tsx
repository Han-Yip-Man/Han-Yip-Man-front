import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import BtnHeader from './BtnHeader'

function Header() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl" disableGutters>
        <CustomToolbar>
          <CustomLink to="/">
            <LogoImg src="/svg/HanYip.svg" alt="" />
          </CustomLink>
          <Stack direction="row" spacing={5}>
            <BtnHeader>로그인</BtnHeader>
            <BtnHeader primary={true}>회원가입</BtnHeader>
          </Stack>
        </CustomToolbar>
      </Container>
    </AppBar>
  )
}

export default Header

const CustomToolbar = styled(Toolbar)`
  color: black;
  font-weight: 500;
  width: 100%;
  max-height: 70px;
  padding: 50px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
`

const CustomLink = styled(Link)`
  width: 15%;
  min-width: 150px;
  max-width: 8%;
  margin-left: 0.7vw;
`

const LogoImg = styled.img`
  width: 100%;
`
