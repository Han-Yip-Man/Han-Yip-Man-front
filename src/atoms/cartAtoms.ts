import { atom, selector } from 'recoil'

interface CartItem {
  amount: number
  cartId: number
  menuName: string
  menuPrice: number
  optionItems?: optionItem[]
  totalPrice: number
}

type optionItem = {
  optionItemId: number
  optionItemName: string
  optionItemPrice: number
}

// 장바구니 초기 상태
const initialCartState: CartItem[] = []

export const CartStateAtom = atom<CartItem[]>({
  key: 'cartState',
  default: initialCartState,
})

export const cartSelectors = selector<CartItem[]>({
  key: 'cartSelectors',
  get: ({ get }) => get(CartStateAtom),
  set: ({ set }, newValue) => set(CartStateAtom, newValue),
})
