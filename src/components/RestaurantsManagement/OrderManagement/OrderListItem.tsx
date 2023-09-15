import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  ListItem,
  Typography,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import styled from '@emotion/styled'
import { forwardRef } from 'react'
import { useRecoilState } from 'recoil'
import { accordionExpand } from '../../../atoms/orderManageAtoms'
import { DraggableProvided } from 'react-beautiful-dnd'

type OmittedDraggableProvided = Omit<DraggableProvided, 'innerRef'>

interface Props extends OmittedDraggableProvided {
  textColor: string
}

const OrderListItem = forwardRef<HTMLLIElement, Props>(
  ({ draggableProps, dragHandleProps, textColor }: Props, ref) => {
    const [expanded, setExpanded] = useRecoilState<string | false>(accordionExpand)

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

    return (
      <ListItem {...draggableProps} {...dragHandleProps} ref={ref}>
        <CustomAccordion
          expanded={expanded === draggableProps['data-rbd-draggable-id']}
          onChange={handleChange(draggableProps['data-rbd-draggable-id'])}
        >
          <AccordionSummary expandIcon={<AddCircleIcon />}>
            <Typography>{'곱창 외 3건'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>주소: 동판교로 123 114동 1901호</Typography>
            <CustomDivider />
            <Typography>주문 메뉴</Typography>
            <Typography>곱창: 20,000원 옵션: 안맵게</Typography>
            <Typography>닭발: 35,000원</Typography>
            <Typography>계란찜: 2,000원</Typography>
            <Typography>오돌뼈: 30,000원</Typography>
            <Typography>배달비: 3,000원</Typography>
            <Divider sx={{ mt: '5px', mb: '5px' }} />
            <Total>결제금액: 90,000원</Total>
            <CustomDivider />
            <Typography>주문시간: 20분전</Typography>
            <Typography>주문번호: 오더아이디1233</Typography>
            <Typography sx={{ color: textColor }}>상태: 배달출발 </Typography>
            <ButtonWrap>
              <Button sx={{ color: 'green', fontSize: '18px' }}>수락</Button>
              <Button sx={{ color: 'red', fontSize: '18px' }}>거절</Button>
            </ButtonWrap>
          </AccordionDetails>
        </CustomAccordion>
      </ListItem>
    )
  },
)

export default OrderListItem

const CustomAccordion = styled(Accordion)`
  width: 100%;
`

const CustomDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 10px;
`
const Total = styled(Typography)`
  color: blue;
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`
