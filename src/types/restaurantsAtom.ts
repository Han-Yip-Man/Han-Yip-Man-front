export interface ShopType {
  shopId: number
  name: string
}

export interface MenuGroupsType {
  menuGroupId: number
  menuGroupName: string
}

export interface AddMenuGroupsType {
  shop_id: number | null
  menuGroupName?: string
}

export interface DeleteMenuGroupsType {
  shop_id: number | null
  menuGroupId?: number
}

export interface PatchMenuGroupsType {
  shop_id: number | null
  menuGroupId?: number
  menuGroupName?: string
}

export interface PatchindexMenuGroupsType {
  shop_id: number | null
  menuGroupId: number
  menuGroupSequence: number
}

export interface addsellerMenuType {
  groupid: number | null
  formdata: FormData
}

export interface patchShopNameType {
  shop_id: number
  shopName: string
}

export type ShopField =
  | 'categoryName'
  | 'shopName'
  | 'shopDescription'
  | 'minOrderPrice'
  | 'businessNumber'
  | 'shopPhone'

export type MenuField = 'menuDescription' | 'menuName' | 'menuPrice' | 'categorygroups'

export interface ShopInfo {
  categoryName?: string | number
  shopName?: string
  shopDescription?: string
  minOrderPrice?: string
  businessNumber?: string
  shopPhone?: string
}
