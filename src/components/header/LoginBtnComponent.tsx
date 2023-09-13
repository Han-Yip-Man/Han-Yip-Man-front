import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Logout from '@mui/icons-material/Logout'
import MopedIcon from '@mui/icons-material/Moped'
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
  const { pathname } = useLocation()
  const currentPath = pathname === '/'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [msg, setMsg] = useState('')
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    const message = messages[Math.floor(Math.random() * messages.length)]
    setMsg(message)
  }, [])

  return (
    <UserInfo>
      <BadgeWrap>
        <IconButton>
          <Badge
            color="warning"
            sx={{
              color: `${currentPath ? 'white' : 'inherit'}`,
              transform: `${currentPath && 'scale(1.2)'}`,
            }}
            badgeContent={100}
          >
            <MopedIcon />
          </Badge>
        </IconButton>
      </BadgeWrap>
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
          {`차지환님 ${msg}`}
        </CustomBtn>
      </CustomizedTooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: '10px',
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>마이 페이지</MenuItem>
        <MenuItem onClick={handleClose}>주문내역</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
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
  display: grid;
  grid-template-columns: 100px 1fr;
  margin-right: 15px;
  position: relative;
`
const BadgeWrap = styled.div`
  display: grid;
  place-items: center;
  transform: translateY(6px);
  padding-left: 20px;
`

const CustomizedTooltip = styled(
  ({ className, ...props }: TooltipProps & { className?: string; children?: React.ReactNode }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '16px',
    fontFamily: 'inherit', // 원하는 폰트로 변경
  },
})
