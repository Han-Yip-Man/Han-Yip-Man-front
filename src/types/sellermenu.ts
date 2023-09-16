export interface addMenuType {
  description: string
  menuName: string
  isMultiple: true
  maxSelected: 0
  itemName: string
  itemPrice: 0
  optionName: string
  price: 0
}

export interface OptionItemType {
  optionItemId: number
  optionItemName: string
  optionItemPrice: number
  isEditing?: boolean
}

export interface OptionType {
  optionId: number
  optionName: string
  isMultiple: boolean
  maxSelected: number
  optionItems: OptionItemType[]
  isEditing?: boolean
}

export interface MenuType {
  menuId: number
  menuName: string
  menuPrice: number
  menuDescription: string
  menuThumbnailUrl: string
  options: OptionType[]
}
