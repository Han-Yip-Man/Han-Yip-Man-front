export interface ShopType {
  shopId: number
  name: string
}

export interface MenuGroupsType {
  menuGroupId: number
  menuGroupName: string
}

export interface AddMenuGroups {
  shop_id: number | null
  menuGroupName?: string
}
