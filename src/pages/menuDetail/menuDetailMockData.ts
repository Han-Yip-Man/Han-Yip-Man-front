export const mmdata = {
  menuId: 2,
  menuName: '메뉴이름',
  menuDescription: 'dfdfdfdf',
  thumbnailUrl: '',
  menuPrice: 19000,
  discountPrice: 19000,
  options: [
    {
      optionId: 2,
      optionName: '소스',
      isMultiple: true,
      maxSelected: 0,
      optionItems: [
        {
          optionItemId: 3,
          optionItemName: '불닭',
          optionItemPrice: 500,
        },
        {
          optionItemId: 4,
          optionItemName: '머스타드',
          optionItemPrice: 300,
        },
      ],
    },
    {
      optionId: 3,
      optionName: '음료',
      isMultiple: false,
      maxSelected: 0,
      optionItems: [
        {
          optionItemId: 5,
          optionItemName: '콜라',
          optionItemPrice: 2500,
        },
        {
          optionItemId: 6,
          optionItemName: '사이다',
          optionItemPrice: 2000,
        },
      ],
    },
  ],
}
