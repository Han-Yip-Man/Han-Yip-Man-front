import { Accordion, AccordionDetails, AccordionSummary, ListItem, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import styled from '@emotion/styled'

function OrderListItem() {
  return (
    <ListItem>
      <CustomAccordion>
        <AccordionSummary expandIcon={<AddCircleIcon />}>
          <Typography>짜장면</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>내용</Typography>
        </AccordionDetails>
      </CustomAccordion>
    </ListItem>
  )
}

export default OrderListItem

const CustomAccordion = styled(Accordion)`
  width: 100%;
`
