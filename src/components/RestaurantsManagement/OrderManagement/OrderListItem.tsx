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
import { forwardRef, useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { accordionExpand } from '../../../atoms/orderManageAtoms'
import { DraggableProvided } from 'react-beautiful-dnd'
import { timeAgo } from '../../../utils/timeAgo'
import { useSocketContext } from '../../../hooks'
import { useQueryClient } from '@tanstack/react-query'

type OmittedDraggableProvided = Omit<DraggableProvided, 'innerRef'>

interface Props extends OmittedDraggableProvided {
  textColor: string
  title: string
  orderId: number
  orderStatus: string
  orderedTime: string
  totalAmount: number
  address: string
  menuResponses: []
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

    return (
      <ListItem {...draggableProps} {...dragHandleProps} ref={ref}>
        <S.CustomAccordion
          expanded={expanded === draggableProps['data-rbd-draggable-id']}
          onChange={handleChange(draggableProps['data-rbd-draggable-id'])}
        >
          <AccordionSummary expandIcon={<AddCircleIcon />}>
            <Typography>{'곱창 외 3건'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{address}</Typography>
            <S.CustomDivider />
            <Typography>주문 메뉴</Typography>
            <Typography>곱창: 20,000원 옵션: 안맵게</Typography>
            {/* <Typography>닭발: 35,000원</Typography>
            <Typography>계란찜: 2,000원</Typography>
            <Typography>오돌뼈: 30,000원</Typography> */}
            {/* <Typography>배달비: 3,000원</Typography> */}
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
                <Button sx={{ color: 'green', fontSize: '18px' }} onClick={() => onClick('accept')}>
                  수락
                </Button>
                <Button sx={{ color: 'red', fontSize: '18px' }} onClick={() => onClick('deny')}>
                  거절
                </Button>
              </S.ButtonWrap>
            )}
          </AccordionDetails>
        </S.CustomAccordion>
      </ListItem>
    )
  },
)

export default OrderListItem
