import styled from '@emotion/styled'
import { css } from '@emotion/css'

import BtnHeader from './BtnHeader'
import LoginBtnComponent from './LoginBtnComponent'
import AddressModal from './AddressModal'
import {
  Button,
  Toolbar,
  Container,
  Stack,
  AppBar,
  Dialog,
  Slide,
  ButtonProps,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined'
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, forwardRef } from 'react'
import { useRecoilValue } from 'recoil'
import { userAddr } from '../../atoms/addressAtoms'
import { userInfo } from '../../atoms/userInfoAtoms'
import useRouter from '../../hooks/useRouter'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const AddressBtn = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button {...props} ref={ref} />
))

function Header() {
  const isLoggedIn = useRecoilValue(userInfo)
  const currentAddr = useRecoilValue(userAddr)
  const { routeTo } = useRouter()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const currentPath = pathname === '/'

  console.log(currentAddr)

  return (
    <AppBar
      position="fixed"
      className={css`
        &&&&&&&&&&&&& {
          background-color: ${currentPath ? 'transparent' : 'white'};
          height: ${!currentPath && '70px'};
          /* box-shadow: ${currentPath && 'none'}; */
          box-shadow: none;
          ${transition};
        }
      `}
    >
      <Container
        maxWidth="xl"
        disableGutters
        className={css`
          height: ${!currentPath && '70px'};
          ${transition}
        `}
      >
        <CustomToolbar
          className={css`
            && {
              ${transition}
              margin-top: ${!currentPath && '5px'};
              ${currentPath
                ? css`
                    display: flex;
                    justify-content: space-between;
                  `
                : css`
                    display: grid;
                    grid-template-columns: 400px 1fr 400px;
                  `}
            }
          `}
        >
          <CustomLink to="/">
            <LogoImg
              src="/svg/HanYip.svg"
              alt="한입만 로고"
              className={css`
                min-width: ${currentPath ? 'calc(100px + 1vw)' : '90px'};
                max-width: ${currentPath ? '7.5%' : '8%'};
                ${transition}
              `}
            />
          </CustomLink>
          {!currentPath && (
            <AddressBtn
              startIcon={<LocationOnIcon />}
              sx={{
                color: `${currentPath ? 'white' : 'black'}`,
                fontSize: '20px',
                mt: '3px',
                transition: 'width .4s',
              }}
              onClick={() => setOpen(true)}
            >
              {currentAddr.place_name}
            </AddressBtn>
          )}
          <Dialog open={open} TransitionComponent={Transition} onClose={() => setOpen(false)}>
            <AddressModal />
          </Dialog>
          {isLoggedIn ? (
            <LoginBtnComponent />
          ) : (
            <Stack
              direction="row"
              spacing={currentPath ? 5 : -3}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <BtnHeader
                width={120}
                currentPath={currentPath}
                onClick={() => routeTo('/user/customer/sign-in')}
              >
                <LocalPizzaOutlinedIcon />
                &nbsp;로그인
              </BtnHeader>
              <BtnHeader
                primary={true}
                width={140}
                currentPath={currentPath}
                onClick={() => routeTo('/user/customer/sign-up')}
              >
                <LunchDiningOutlinedIcon />
                &nbsp;회원가입
              </BtnHeader>
            </Stack>
          )}
        </CustomToolbar>
      </Container>
    </AppBar>
  )
}

export default Header

const transition = css`
  transition: all 0.4s !important;
`

const CustomToolbar = styled(Toolbar)`
  color: black;
  font-weight: 500;
  width: 100%;
  max-height: 70px;
  margin-top: 30px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
`

const CustomLink = styled(Link)`
  max-width: 8%;
  margin-left: 0.7vw;
`

const LogoImg = styled.img`
  width: 100%;
`
