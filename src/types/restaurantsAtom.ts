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
