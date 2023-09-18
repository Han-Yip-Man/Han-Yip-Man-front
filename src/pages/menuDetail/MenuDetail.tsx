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
// import AddOptionThree from '../../components/menuDetail/AddOptionThree'
import useAlert from '../../hooks/useAlert'
// import { mmdata } from './menuDetailMockData'

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

const MenuDetail = () => {
  const toast = useAlert()

  const [isOpen, setIsOpen] = useState(false)

  const [data, setData] = useState<MenuData>(initialMenuData)

  const [quantity, setQuantity] = useState<number>(1)

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: { optionItemId: number; optionItemName: string; optionItemPrice: number }[]
  }>({})

  // useEffect(() => {
  //   const mock_data = mmdata
  //   console.log(mock_data)
  //   // setMockData(mmdata)
  //   setData(mock_data)

  //   return () => {}
  // }, [])

  // useEffect(() => {
  //   const mock_data = mmdata
  //   setData(mock_data)

  //   return () => {}
  // }, [])

  useEffect(() => {
    getMenuDetail(data.menuId)
      .then((response: AxiosResponse) => {
        console.log(response)
        console.log('데이터', response.data.menuName)
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
  }, [data.menuId])

  const handleClick = () => {
    toast('장바구니에 담겼습니다.', 3000, 'success')
    // 모달띄워주는 로직작성
    setIsOpen(true)
  }

  // ======================================================================================
  // const handleOptionChange = (
  //   name: string,
  //   price: number,
  //   isChecked: boolean,
  //   optionType: string,
  // ) => {
  //   if (isChecked) {
  //     setSelectedOptions((prevOptions) => ({
  //       ...prevOptions,
  //       [optionType]: [...(prevOptions[optionType] || []), { name, price }],
  //     }))
  //   } else {
  //     setSelectedOptions((prevOptions) => ({
  //       ...prevOptions,
  //       [optionType]: prevOptions[optionType].filter((option) => option.name !== name),
  //     }))
  //   }
  // }

  // ======================================================================================
  const handleOptionChange = (
    name: string,
    price: number,
    isChecked: boolean,
    optionType: string,
  ) => {
    const currentOption = data.options?.find((option) => option.optionName === optionType)

    if (!currentOption) return

    const { isMultiple, maxSelected } = currentOption

    setSelectedOptions((prevOptions: any) => {
      if (isChecked) {
        // maxSelected가 1개인 경우
        if (maxSelected === 1) {
          return {
            ...prevOptions,
            [optionType]: [{ optionItemName: name, optionItemPrice: price }],
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
            { optionItemName: name, optionItemPrice: price },
          ],
        }
      } else {
        // 체크 해제 시의 로직은 그대로 유지
        return {
          ...prevOptions,
          [optionType]: prevOptions[optionType].filter(
            (option: any) => option.optionItemName !== name,
          ),
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
