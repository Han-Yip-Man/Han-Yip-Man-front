import { Box, Accordion, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuList from '../menuList/MenuList'
import * as S from './BasicAccordion.style'
import { menuInfo } from '../types'

type BasicAccordionProps = {
  menuList: {
    menuByMenuGroupList: menuInfo[]
    menuGroupId: number
    menuGroupName: string
  }
}

export default function BasicAccordion({ menuList }: BasicAccordionProps) {
  return (
    <Box>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{menuList.menuGroupName}</Typography>
        </AccordionSummary>
        <S.MenuListWrap>
          <MenuList menuList={menuList.menuByMenuGroupList} />
        </S.MenuListWrap>
      </Accordion>
    </Box>
  )
}
