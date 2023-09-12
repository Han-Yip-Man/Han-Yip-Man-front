import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  styled,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuList from './MenuList'

type menuInfo = {
  menuDescription: string
  menuDiscountPrice: number
  menuId: number
  menuName: string
  menuPrice: number
  menuThumbnailUrl: string
}

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
        <MenuListWrap>
          <MenuList menuList={menuList.menuByMenuGroupList} />
        </MenuListWrap>
      </Accordion>
    </Box>
  )
}

const MenuListWrap = styled(AccordionDetails)`
  width: 100%;
  padding: 0px;
`
