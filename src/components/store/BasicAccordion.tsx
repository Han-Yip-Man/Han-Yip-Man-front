import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuList from './MenuList'

export default function BasicAccordion() {
  return (
    <Box>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            신제품 | 세트 | 프리미엄 | 클래식 | 더블치즈엣지 | 사이드디시 | 음료 | 기타
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MenuList />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
