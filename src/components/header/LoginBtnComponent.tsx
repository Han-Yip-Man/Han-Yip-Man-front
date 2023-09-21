import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { Button, Menu, MenuItem, Divider, ListItemIcon, IconButton, Badge } from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import MopedIcon from '@mui/icons-material/Moped'
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { userInfo } from '../../atoms/userInfoAtoms'
import { currentAddr, userAddr } from '../../atoms/addressAtoms'
import { useRouter } from '../../hooks'
import { UserInfoType } from '../../types/user'

const messages = [
  '떡볶이 한사발 하시죠?',
  '피자 한판 하시죠?',
  '족발 하나 드시죠?',
  '라면 한그릇 어떠세요?',
  '냉면 한그릇 하실래예?',
  '스파게리 함 무보입시더~',
  '초밥 몇조각 씹어보실래요?',
]

function LoginBtnComponent() {
  const resetCurrentAddr = useResetRecoilState(userAddr)
  const resetNonLoginAddrs = useResetRecoilState(currentAddr)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [msg, setMsg] = useState('')
  const { pathname } = useLocation()
  const { routeTo } = useRouter()
  const isLoggedIn = useRecoilValue(userInfo) as UserInfoType | null // 사용자 이름
  const currentPath = pathname === '/'
  const open = !!anchorEl

  const handleClose = (url?: string) => {
    setAnchorEl(null)
    if (url) {
      routeTo(url)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    resetCurrentAddr()
    resetNonLoginAddrs()
    sessionStorage.clear()
    handleClose()
  }

  useEffect(() => {
    const message = messages[Math.floor(Math.random() * messages.length)]
    setMsg(message)
  }, [])

  console.log(isLoggedIn)

  return (
    <UserInfo>
      {!currentPath && (
        <BadgeWrap>
          <IconButton>
            <Badge
              color="warning"
              sx={{
                color: `${currentPath ? 'white' : 'inherit'}`,
                transform: `${currentPath && 'scale(1.2)'}`,
              }}
              badgeContent={3}
            >
              <MopedIcon />
            </Badge>
          </IconButton>
        </BadgeWrap>
      )}
      <CustomizedTooltip title={'나의 정보'}>
        <CustomBtn
          className={css`
            && {
              font-size: ${currentPath ? '24px' : '15px'};
              color: ${currentPath ? 'white' : 'black'};
              transition: all 0.4s;
              border-radius: 0;
            }
          `}
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {`${isLoggedIn?.nickname}님 ${msg}`}
        </CustomBtn>
      </CustomizedTooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => handleClose()}
        sx={{
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: '10px',
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            handleClose('/dashboard/user')
          }}
        >
          마이 페이지
        </MenuItem>
        {/* <MenuItem onClick={() => handleClose()}>주문내역</MenuItem> */}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
          {/* 세션 스토리지에 토큰을 비우고 userAddr도 비우고  */}
        </MenuItem>
      </Menu>
    </UserInfo>
  )
}

export default LoginBtnComponent

const CustomBtn = styled(Button)`
  font-family: inherit;
`

const UserInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  position: relative;
`
const BadgeWrap = styled.div`
  display: grid;
  place-items: center;
  transform: translateY(6px);
  padding-right: 20px;
`

const CustomizedTooltip = styled(
  ({ className, ...props }: TooltipProps & { className?: string; children?: React.ReactNode }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '16px',
    fontFamily: 'inherit',
  },
})
