import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  ListItem,
  Typography,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import * as S from './OrderListItem.style'
import { forwardRef, useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { accordionExpand } from '../../../atoms/orderManageAtoms'
import { DraggableProvided } from 'react-beautiful-dnd'
import { timeAgo } from '../../../utils/timeAgo'
import { useSocketContext } from '../../common/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { ChatRoomEnter } from '../../common/components'

type OmittedDraggableProvided = Omit<DraggableProvided, 'innerRef'>

interface Props extends OmittedDraggableProvided {
  textColor: string
  title: string
  orderId: number
  orderStatus: string
  orderedTime: string
  totalAmount: number
  address: string
  menuResponses: MenuData[]
}

type MenuData = {
  menuName: string
  optionNames: []
}

function processMenuResponses(menuResponses: MenuData[]): string {
  const menuNames = [...new Set(menuResponses.map((response) => response.menuName))]
  const length = menuNames.length

  if (length === 0) return '메뉴가 없습니다.'
  if (length === 1) return `${menuNames[0]}`

  return `${menuNames.join(', ')} 외 ${menuResponses.length - length}건`
}

const OrderListItem = forwardRef<HTMLLIElement, Props>(
  (
    {
      draggableProps,
      dragHandleProps,
      textColor,
      title,
      orderId,
      orderStatus,
      orderedTime,
      totalAmount,
      address,
      menuResponses,
    }: Props,
    ref,
  ) => {
    const [open, setOpen] = useState(true)
    const [expanded, setExpanded] = useRecoilState<string | false>(accordionExpand)
    const { socket } = useSocketContext()
    const qc = useQueryClient()

    const handleChange = useCallback(
      (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
      },
      [],
    )

    const memoizedTime = useMemo(() => timeAgo(orderedTime), [orderedTime]) // 상태바꿀때마다 현재시간됨

    const onClick = (action: string) => {
      const movedItem = {
        orderId,
        orderStatus: action === 'accept' ? 'TAKEOVER' : 'CANCELED',
        orderSequence: 0,
      }
      socket?.emit('send_order_status_change', movedItem, () => {
        qc.invalidateQueries(['orderList'])
      })
    }
    // 나중에 컴포넌트 분리해야함

    const onClose = () => {
      setOpen(false)
    }

    return (
      <>
        <ListItem {...draggableProps} {...dragHandleProps} ref={ref}>
          <S.CustomAccordion
            expanded={expanded === draggableProps['data-rbd-draggable-id']}
            onChange={handleChange(draggableProps['data-rbd-draggable-id'])}
            onClick={onClose}
          >
            <AccordionSummary expandIcon={<AddCircleIcon />}>
              <Typography>{`${processMenuResponses(menuResponses)}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{address}</Typography>
              <S.CustomDivider />
              <Typography>주문 메뉴</Typography>
              {menuResponses.map((menu: MenuData, i) => (
                <Typography key={i}>{`${menu.menuName}`}</Typography>
              ))}
              <Divider sx={{ mt: '5px', mb: '5px' }} />
              <S.Total>결제금액: {totalAmount.toLocaleString()}원</S.Total>
              <S.CustomDivider />
              <Typography>주문시간: {memoizedTime}</Typography>
              <Typography>주문번호: {orderId}</Typography>
              <Typography component="div" sx={{ display: 'flex' }}>
                상태:&nbsp;
                <Typography sx={{ color: textColor }}>{orderStatus}</Typography>
              </Typography>
              {title === '주문대기' && (
                <S.ButtonWrap>
                  <Button
                    sx={{ color: 'green', fontSize: '18px' }}
                    onClick={() => onClick('accept')}
                  >
                    수락
                  </Button>
                  <Button sx={{ color: 'red', fontSize: '18px' }} onClick={() => onClick('deny')}>
                    거절
                  </Button>
                </S.ButtonWrap>
              )}
            </AccordionDetails>
            <ChatRoomEnter orderId={orderId} />
          </S.CustomAccordion>
        </ListItem>
      </>
    )
  },
)

export default OrderListItem
