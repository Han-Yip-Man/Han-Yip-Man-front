import { useEffect, useState } from 'react'
import * as S from './MenuDetail.Styles'
import CounterBox from '../../components/menuDetail/CounterBox'
import AddOptionOne from '../../components/menuDetail/AddOptionOne'
import MenuDetailModal from './MenuDetailModal'
import { getMenuDetail } from '../../api/menu'
// import useRouter from '../../hooks/useRouter'
import { isAxiosError, AxiosResponse } from 'axios'
// import { mmdata } from './menuDetailMockData'
import useAlert from '../../hooks/useAlert'
import { useRecoilState } from 'recoil'
import { CartStateAtom } from '../../atoms/cartAtoms'
import { useParams } from 'react-router-dom'
import { addCartItems } from '../../api/cart'

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
  menuId: 0,
  menuName: '',
  menuDescription: '',
  thumbnailUrl: '',
  menuPrice: 0,
  discountPrice: 0,
  options: [],
}
interface CartItem {
  amount: number
  cartId: string
  menuName: string
  menuPrice: number
  optionItems?: optionItem[]
  totalPrice: number
}

interface MenuDetailProps {
  cartItem?: CartItem
}
const MenuDetail = ({ cartItem }: MenuDetailProps) => {
  const toast = useAlert()
  const { amount, cartId, menuName, menuPrice, optionItems, totalPrice } = cartItem || {}
  const [cartProduct, setCartProduct] = useRecoilState(CartStateAtom)

  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<MenuData>(initialMenuData)
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: { optionItemId: number; optionItemName: string; optionItemPrice: number }[]
  }>({})

  const { menuId } = useParams<{ menuId: string }>()

  useEffect(() => {
    console.log('장바구니 확인', cartProduct)
  }, [cartProduct])

  // useEffect(() => {
  //   const mock_data = mmdata
  //   console.log(mock_data)
  //   setData(mock_data)

  //   return () => {}
  // }, [])

  useEffect(() => {
    getMenuDetail(Number(menuId))
      .then((response: AxiosResponse) => {
        setData(response.data)

        const initialSelectedOptions = response.data.options.reduce(
          (acc: any, option: any) => ({
            ...acc,
            [option.optionName]: [],
          }),
          {},
        )
        setSelectedOptions(initialSelectedOptions)
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          toast(`${error.message}`, 3000, 'error')
        }
      })
  }, [menuId])

  const handleClick = () => {
    toast('장바구니에 담겼습니다.', 3000, 'success')
    // 모달띄워주는 로직작성
    setIsOpen(true)
  }

  const handleAddToCart = () => {
    if (data && quantity) {
      const allSelectedOptionItems = Object.values(selectedOptions).reduce(
        (prev, curr) => prev.concat(curr),
        [],
      )

      const newCartItem = {
        amount: quantity,
        cartId: data.menuId.toString(),
        menuName: data.menuName,
        menuPrice: data.menuPrice,
        optionItems: allSelectedOptionItems,
        totalPrice: (data.menuPrice + totalOptionPrice) * quantity,
      }

      setCartProduct((prevItems) => [...prevItems, newCartItem])

      const selOptArr = allSelectedOptionItems.map((optionItem) => optionItem.optionItemId)

      const requestCartItem = {
        shopId: 11410,
        menuId: data.menuId,
        options: selOptArr,
        amount: quantity,
      }
      addCartItems(requestCartItem) // 임포트 부탁드립니다
    }
  }

  const handleOptionChange = (
    id: number,
    name: string,
    price: number,
    isChecked: boolean,
    optionType: string,
  ) => {
    const currentOption = data.options?.find((option) => option.optionName === optionType)

    if (!currentOption) return

    const { isMultiple, maxSelected } = currentOption

    setSelectedOptions((prevOptions) => {
      if (isChecked) {
        // maxSelected가 1개인 경우
        if (maxSelected === 1) {
          return {
            ...prevOptions,
            [optionType]: [{ optionItemId: id, optionItemName: name, optionItemPrice: price }],
          }
        }

        // maxSelected가 2개 이상인 경우
        if (
          !isMultiple ||
          (prevOptions[optionType] && prevOptions[optionType].length >= maxSelected)
        )
          return prevOptions

        return {
          ...prevOptions,
          [optionType]: [
            ...(prevOptions[optionType] || []),
            { optionItemId: id, optionItemName: name, optionItemPrice: price },
          ],
        }
      } else {
        // 체크 해제 시의 로직은 그대로 유지
        return {
          ...prevOptions,
          [optionType]: prevOptions[optionType].filter((option) => option.optionItemName !== name),
        }
      }
    })
  }

  const totalOptionPrice = Object.values(selectedOptions).reduce(
    (totalPrice1, options) =>
      totalPrice1 +
      options.reduce((totalPrice2, option) => totalPrice2 + option.optionItemPrice, 0),
    0,
  )

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
              {data.options &&
                data.options.map((option) => (
                  <AddOptionOne
                    option={option}
                    onOptionChange={handleOptionChange}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  />
                ))}
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
            {Object.entries(selectedOptions).map(([key, value]) => (
              <S.MainDiv key={key}>
                <S.TitleDiv>{key}</S.TitleDiv>
                <S.PickedMenuDiv>
                  {value
                    .map(
                      (option) =>
                        `${option.optionItemName}/${option.optionItemPrice}원x${quantity}`,
                    )
                    .join(', ')}
                </S.PickedMenuDiv>
              </S.MainDiv>
            ))}

            <S.MainDiv>
              <S.TotalPriceDiv>
                총 금액&nbsp;&nbsp;
                {((data.menuPrice + totalOptionPrice) * quantity).toLocaleString('ko-KR')}원
              </S.TotalPriceDiv>
              <S.OrderButton
                onClick={() => {
                  handleClick()
                  handleAddToCart()
                }}
              >
                장바구니 담기
              </S.OrderButton>
              {isOpen && <MenuDetailModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            </S.MainDiv>
          </S.MainOuterDiv>
        </S.BottomDiv>
      </S.WrapperDiv>
    </>
  )
}

export default MenuDetail
