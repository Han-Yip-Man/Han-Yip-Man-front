import { useEffect, useState } from 'react'
import * as S from './MenuDetail.Styles'
import CounterBox from '../../components/menuDetail/CounterBox'
import AddOptionOne from '../../components/menuDetail/AddOptionOne'
// import AddOptionTwo from '../../components/menuDetail/AddOptionTwo'
// import AddOptionThree from '../../components/menuDetail/AddOptionThree'
import MenuDetailModal from './MenuDetailModal'
import { getMenuDetail } from '../../api/menu'
// import useRouter from '../../hooks/useRouter'
// import { useRecoilState } from 'recoil'
// import { jeeinAtom } from '../../atoms'
import { isAxiosError, AxiosResponse } from 'axios'
// import { mmdata } from './menuDetailMockData'
// import SizeOption from '../../components/menuDetail/SizeOption'
import AddOptionThree from '../../components/menuDetail/AddOptionThree'
import useAlert from '../../hooks/useAlert'
import { mmdata } from './menuDetailMockData'

type optionItem = {
  optionItemId: number
  optionItemName: string
  optionItemPrice: number
}

type option = {
  optionId: number
  optionName: string
  isMultiple: boolean
  maxSelected: number
  optionItems: optionItem[]
}

interface MenuData {
  menuId: number
  menuPrice: number
  menuName: string
  menuDescription: string
  thumbnailUrl?: string
  discountPrice?: number
  options?: option[]
}

const initialMenuData = {
  menuId: 2,
  menuName: '',
  menuDescription: '',
  thumbnailUrl: '',
  menuPrice: 0,
  discountPrice: 0,
  options: [],
}

type DrinkOption = {
  name: string
  price: number
}

const MenuDetail = () => {
  const toast = useAlert()

  const [isOpen, setIsOpen] = useState(false)

  const [data, setData] = useState<MenuData>(initialMenuData)

  const [quantity, setQuantity] = useState<number>(1)

  const [sauceOptions, setSauceOptions] = useState<Array<{ name: string; price: number }>>([])
  const [drinkOption, setDrinkOption] = useState<DrinkOption>({} as DrinkOption)

  // useEffect(() => {
  //   const mock_data = mmdata
  //   console.log(mock_data)
  //   // setMockData(mmdata)
  //   setData(mock_data)

  //   return () => {}
  // }, [])

  useEffect(() => {
    getMenuDetail(data.menuId)
      .then((response: AxiosResponse) => {
        console.log(response)
        console.log('데이터', response.data.menuName)
        setData(response.data)
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          toast(`${error.message}`, 3000, 'error')
        }
      })
  }, [data.menuId])
  useEffect(() => {
    const mock_data = mmdata
    setData(mock_data)

    return () => {}
  }, [])

  const handleClick = () => {
    toast('장바구니에 담겼습니다.', 3000, 'success')
    // 모달띄워주는 로직작성
    setIsOpen(true)
  }

  const handleOptionChange = (
    id: string,
    name: string,
    price: number,
    isChecked: boolean,
    optionType: string,
  ) => {
    if (isChecked) {
      if (optionType === '소스') {
        setSauceOptions((prevOptions) => [...prevOptions, { name, price }])
      } else if (optionType === '음료') {
        const currentOption = data.options
          ?.flatMap((option) => option.optionItems)
          .filter((optionItem) => `option-${optionItem.optionItemId}` === id)
        const curname = currentOption ? currentOption[0]['optionItemName'] : ''
        setDrinkOption({ name: curname, price } as DrinkOption)
      }
    } else {
      if (optionType === '소스') {
        setSauceOptions((prevOptions) => prevOptions.filter((option) => option.name !== name))
      } else if (optionType === '음료') {
        setDrinkOption({} as DrinkOption)
      }
    }
  }

  const totalOptionPrice =
    sauceOptions.reduce((totalPrice, option) => totalPrice + option.price, 0) + drinkOption.price

  const mainMenuPrice = data.menuPrice.toLocaleString('ko-KR')

  return (
    <>
      <S.WrapperDiv>
        <S.MainWrapperDiv>
          <S.FixedDiv>
            <S.Img alt={data.menuName} src={data.thumbnailUrl} />
          </S.FixedDiv>

          <S.OptionDiv>
            <S.MenuInfoDiv>
              <S.MenuNameDiv>{data.menuName}</S.MenuNameDiv>
              <S.MenuExpDiv>{data.menuDescription}</S.MenuExpDiv>
              <S.MenuPriceDiv> {mainMenuPrice}원</S.MenuPriceDiv>
            </S.MenuInfoDiv>

            <S.OptionBox>
              {data.options?.map((option) =>
                option.isMultiple ? (
                  <AddOptionOne
                    key={option.optionId}
                    option={option}
                    onOptionChange={handleOptionChange}
                  />
                ) : (
                  <>
                    <AddOptionThree
                      key={option.optionId}
                      optionValue={option}
                      onOptionChange={handleOptionChange}
                    />
                  </>
                ),
              )}
            </S.OptionBox>

            <S.OptionBox>
              <CounterBox quantity={quantity} setQuantity={setQuantity} />
            </S.OptionBox>
          </S.OptionDiv>
        </S.MainWrapperDiv>

        <S.BottomDiv>
          <S.MainOuterDiv>
            <S.MainDiv>
              <S.TitleDiv>메뉴</S.TitleDiv>
              <S.PickedMenuDiv>
                {mainMenuPrice}원x{quantity}
              </S.PickedMenuDiv>
            </S.MainDiv>
            <S.MainDiv>
              <S.TitleDiv>소스</S.TitleDiv>
              <S.PickedMenuDiv>
                {sauceOptions
                  .map((option) => `${option.name}/${option.price}원x${quantity}`)
                  .join(', ')}
              </S.PickedMenuDiv>
            </S.MainDiv>
            <S.MainDiv>
              <S.TitleDiv>음료</S.TitleDiv>
              <S.PickedMenuDiv>
                {drinkOption.name ? `${drinkOption.name}/${drinkOption.price}원x${quantity}` : null}
              </S.PickedMenuDiv>
            </S.MainDiv>
            <S.MainDiv>
              <S.TotalPriceDiv>
                {((data.menuPrice + totalOptionPrice) * quantity).toLocaleString('ko-KR')}원
              </S.TotalPriceDiv>
              <S.OrderButton onClick={handleClick}>주문하기</S.OrderButton>
              {isOpen && <MenuDetailModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            </S.MainDiv>
          </S.MainOuterDiv>
        </S.BottomDiv>
      </S.WrapperDiv>
    </>
  )
}

export default MenuDetail
