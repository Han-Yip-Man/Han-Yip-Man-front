import Menumanagement from '../Menumanagement/Menumanagement'
import MenumanagementHeader from '../MenumanagementHeader/MenumanagementHeader'
import { useRecoilState } from 'recoil'
import { shopmenupage } from '../../../atoms/restaurantsAtoms'
import AddMenu from '../AddMenu/AddMenu'
import { useEffect } from 'react'
import * as S from './MenuContainer.style'

const MenuContainer = () => {
  const [menupage, setMenupage] = useRecoilState(shopmenupage)

  const renderMenupage = () => {
    switch (menupage) {
      case 1:
        return <Menumanagement />
      case 2:
        return <AddMenu />
      default:
        return null
    }
  }

  useEffect(() => {
    return setMenupage(1)
  }, [])

  return (
    <S.Wrapper>
      <MenumanagementHeader />
      {renderMenupage()}
    </S.Wrapper>
  )
}

export default MenuContainer
