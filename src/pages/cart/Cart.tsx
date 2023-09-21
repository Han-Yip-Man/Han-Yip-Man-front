import * as S from './Cart.Styles'
import IconMinus from '../../assets/iconMinus.svg'
import IconPlus from '../../assets/iconPlus.svg'
import IconX from '../../assets/iconX.svg'
import { useNavigate } from 'react-router-dom'
import { Divider, Typography } from '@mui/material'
import {
  getCartItems,
  updateCountCartItems,
  selecteddeleteCartItems,
  deleteAllCartItems,
} from '../../api/cart'
import { useEffect, useState } from 'react'
import { AxiosResponse, isAxiosError } from 'axios'
import { useAlert, useRouter } from '../../hooks'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CartStateAtom, totalCartPriceSelector } from '../../atoms/cartAtoms'
import Ximg from '../../assets/iconX.svg'
import Plusimg from '../../assets/iconPlus.svg'
import Minusimg from '../../assets/iconMinus.svg'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMypageInfo } from '../../api/mypage'
import { UserStateAtom } from '../../atoms/orderAtoms'

const Cart: React.FC = () => {
  const toast = useAlert()
  // const queryClient = useQueryClient()

  // const { data: cartData } = useQuery(['carts'], () => getCartItems())
  // const updateCart = useMutation(updateCountCartItems, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['carts'])
  //   },
  // })
  // const deleteCart = useMutation(deleteCartItems, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['carts'])
  //   },
  // })

  const { routeTo } = useRouter()
  const [cartProduct, setCartProduct] = useRecoilState(CartStateAtom)
  const [orderUserInfo, setOrderUserInfo] = useRecoilState(UserStateAtom)
  const totalCartPrice = useRecoilValue(totalCartPriceSelector)

  const handleQuantityChange = (index: number, newQuantity: number, cartId: number) => {
    // if (newQuantity === 0) return deleteCart.mutate(cartId)

    // const payload = {
    //   amount: newQuantity,
    //   cartId,
    // }
    // updateCart.mutate(payload)

    // setCartProduct((prevItems) =>
    //   prevItems.map((item, i) => {
    //     if (i === index) {
    //       const unitPrice =
    //         item.menuPrice +
    //         (item.optionItems?.reduce((total, option) => total + option.optionItemPrice, 0) || 0)
    //       return {
    //         ...item,
    //         amount: Math.max(1, newQuantity),
    //         totalPrice: unitPrice * Math.max(1, newQuantity),
    //       }
    //     } else {
    //       return item
    //     }
    //   }),
    // )

    if (newQuantity > 0) {
      updateCountCartItems({ amount: newQuantity, cartId: cartId }).then(
        (response: AxiosResponse) => {
          getCartItems().then((response) => {
            setCartProduct(response.data)
            console.log(response)
          })
        },
      )
    }
  }

  const handleRemoveItem = (index: number) => {
    setCartProduct((prevItems) => prevItems.filter((item, i) => i !== index))
  }

  const handleRemoveAllItems = () => {
    alert('정말 전체 삭제하시겠습니까?')
    deleteAllCartItems().then((response: AxiosResponse) => {
      setCartProduct([])
    })
  }

  useEffect(() => {
    getCartItems()
      .then((response: AxiosResponse) => {
        // console.log('Cart 데이터', response)
        // console.log('Cart 데이터2', response.data)
        // console.log('Cart 데이터3', response.data.content)
        setCartProduct(response.data)
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          toast(`${error.message}`, 3000, 'error')
        }
      })
  }, []) // 아 네네 그러면 쿠폰을 선택했을 때 업데이트를 서버에 시켜야겠네요
  //저 여기서 amount 안 맞는 거 다시 콘솔창 띄워보겠습니다 할인 전 금액 네 아하 네
  useEffect(() => {
    getMypageInfo().then((response) => {
      setOrderUserInfo(response)
    })
  }, [])

  const handleselecteddelete = (id: number) => {
    selecteddeleteCartItems(id)
      .then(() => {
        toast('삭제에 성공하였습니다.', 2000, 'success')
        getCartItems().then((response) => {
          setCartProduct(response.data)
        })
      })
      .catch(() => {
        toast('삭제에 실패했습니다.', 2000, 'error')
      })
  }

  return (
    <S.OuterDiv>
      <S.TopDiv>
        <S.TitleDiv>장바구니</S.TitleDiv>
      </S.TopDiv>
      <S.CustomDivider />
      <S.ListWrap>
        <S.TitleWrap>
          <S.ListTitleWrap>
            <S.CustomTypo>주문내역</S.CustomTypo>
            <S.BtnWrap>
              <S.CustomBtn onClick={handleRemoveAllItems}>전체 삭제</S.CustomBtn>
            </S.BtnWrap>
          </S.ListTitleWrap>
          <S.SubTitleWrap>
            <S.SubTitleTypo1>상품정보</S.SubTitleTypo1>
            <S.SubTitleTypo2>수량</S.SubTitleTypo2>
            <S.SubTitleTypo3>금액</S.SubTitleTypo3>
            <S.SubTitleTypo4></S.SubTitleTypo4>
          </S.SubTitleWrap>
        </S.TitleWrap>
        <S.ItemList>
          {cartProduct?.map((item, index) => (
            <S.ItemLi key={index}>
              <S.ItemDescWrap>
                {/* <S.ItemImg
        alt="이미지"
        src={cartProduct.thumbnailUrl} // thumbnailUrl 등 사진이 api 명세서에 없다?
      /> */}
                <S.ImgTitle>
                  {item.menuName}/{item.menuPrice?.toLocaleString('ko-KR')}원x{item.amount}
                </S.ImgTitle>
                <S.OptionContent>
                  추가 선택:
                  {item.optionItems?.map((optionItem, index) => (
                    <div key={index}>
                      {optionItem.optionItemName}/
                      {optionItem.optionItemPrice?.toLocaleString('ko-KR')}
                      원x{item.amount}
                    </div>
                  ))}
                </S.OptionContent>
              </S.ItemDescWrap>
              <S.OptionWrap>
                <S.CounterOuterDiv>
                  <S.CounterBtnWrap>
                    <S.CounterBtnMinus
                      onClick={() => handleQuantityChange(index, item.amount - 1, item.cartId)}
                    >
                      <img src={Minusimg} />
                    </S.CounterBtnMinus>
                    <S.CounterDisplayInput type="text" value={item.amount} min="1" readOnly />
                    <S.CounterBtnPlus
                      onClick={() => handleQuantityChange(index, item.amount + 1, item.cartId)}
                    >
                      <img src={Plusimg} />
                    </S.CounterBtnPlus>
                  </S.CounterBtnWrap>
                </S.CounterOuterDiv>
                <S.TotalWrap>
                  <S.Total>{item.totalPrice.toLocaleString('ko-KR')}원</S.Total>
                </S.TotalWrap>
                <S.DelBtnWrap onClick={() => handleRemoveItem(index)}>
                  <button onClick={() => handleselecteddelete(item.cartId)}>
                    <img src={Ximg} />
                  </button>
                </S.DelBtnWrap>
              </S.OptionWrap>
            </S.ItemLi>
          ))}
        </S.ItemList>
      </S.ListWrap>
      <S.TotalPriceDiv>
        총 금액&nbsp;&nbsp;&nbsp;<S.Span>{totalCartPrice?.toLocaleString('ko-KR')}</S.Span>원
      </S.TotalPriceDiv>
      <S.BottomDiv>
        <S.ShopGoDiv>
          <S.ShopGoButton
            onClick={() => {
              routeTo('/menuDetail') // 수정 필요
            }}
          >
            메뉴 추가하기
          </S.ShopGoButton>
        </S.ShopGoDiv>
        <S.OrderDiv>
          <S.OrderButton
            onClick={() => {
              routeTo('/order')
            }}
          >
            주문하기
          </S.OrderButton>
        </S.OrderDiv>
      </S.BottomDiv>
    </S.OuterDiv>
  )
}
export default Cart

// 구현해야 할 것: 동일main+Option이면 신규 추가가 아닌 수량 증가

// react-query

// {cartData?.data.content.map((item: any, index: number) => (
//   <S.ItemLi key={index}>
//     <S.ItemDescWrap>
//       {/* <S.ItemImg
//         alt="이미지"
//         src={cartProduct.thumbnailUrl} // thumbnailUrl 등 사진이 api 명세서에 없다?
//       /> */}
//       <S.ImgTitle>
//         {item.menuName}/{item.menuPrice.toLocaleString('ko-KR')}원x
//         {item.amount}
//       </S.ImgTitle>
//       <S.OptionContent>
//         추가 선택:
//         {item.optionItems?.map((optionItem: any, index: number) => (
//           <div key={index}>
//             {optionItem.optionItemName}/{optionItem.optionItemPrice.toLocaleString('ko-KR')}
//             원x{item.amount}
//           </div>
//         ))}
//       </S.OptionContent>
//     </S.ItemDescWrap>
//     <S.OptionWrap>
//       <S.CounterOuterDiv>
//         <S.CounterBtnWrap>
//           <S.CounterBtnMinus
//             onClick={() => handleQuantityChange(index, item.amount - 1, item.cartId)}
//           >
//             <img src={Minusimg} />
//           </S.CounterBtnMinus>
//           <S.CounterDisplayInput type="text" value={item.amount} min="1" />
//           <S.CounterBtnPlus
//             onClick={() => handleQuantityChange(index, item.amount + 1, item.cartId)}
//           >
//             <img src={Plusimg} />
//           </S.CounterBtnPlus>
//         </S.CounterBtnWrap>
//       </S.CounterOuterDiv>
//       <S.TotalWrap>
//         <S.Total>{item.totalPrice.toLocaleString('ko-KR')}원</S.Total>
//       </S.TotalWrap>
//       <S.DelBtnWrap onClick={() => handleRemoveItem(index)}>
//         <button>
//           <img src={Ximg} />
//         </button>
//       </S.DelBtnWrap>
//     </S.OptionWrap>
//   </S.ItemLi>
// ))}
