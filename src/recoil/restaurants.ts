import { atom } from 'recoil'
import { ShopType, MenuGroupsType } from '../types/restaurantsAtom'
import { selector } from 'recoil'

//사장님 관리페이지에서 컴포넌트 이동
export const sellerDashboardNum = atom({
  key: 'sellerDashboardNum',
  default: 1,
})

//내 가게들 조회
export const shopListState = atom<ShopType[]>({
  key: 'shopListState',
  default: [],
})

//가게 ID 관리
export const selectedShopIdState = atom<number | null>({
  key: 'selectedShopIdState',
  default: undefined,
})

//가게 상세조회
export const shopDetailState = atom({
  key: 'shopDetailState',
  default: {
    address: '',
    bannerUrl: '',
    businessNumber: '',
    categoryName: '',
    detailAddress: '',
    minOrderPrice: 0,
    shopDescription: '',
    shopName: '',
    shopPhone: '',
    thumbnailUrl: '',
  },
})

//ID에 따른 가게이름
export const selectedShopNameState = selector<string | null>({
  key: 'selectedShopNameState',
  get: ({ get }) => {
    const selectedShopId = get(selectedShopIdState)
    const shopList = get(shopListState) || []
    const selectedShop = shopList.find((shop) => shop.shopId === selectedShopId)
    return selectedShop?.name || null
  },
})

//가게 메뉴 대분류
export const shopMenuGroups = atom<MenuGroupsType[]>({
  key: 'shopMenuGroups',
  default: [],
})

//가게 메뉴 대분류
export const shopdeletemodal = atom({
  key: 'shopdeletemodal',
  default: false,
})

//가게 대분류 ID
export const shopGroupid = atom<number | null>({
  key: 'shopGroupid',
  default: undefined,
})

//메뉴관리 페이지
export const shopmenupage = atom({
  key: 'shopmenupage',
  default: 1,
})
