import axiosClient from './axiosInstance'
import { getStoreDetail } from './storeDetail'

export const getOrder = async (orderId: number) => {
  console.log('getOrder>>>', orderId)
  // const response = await axiosClient.get(`orders/${orderId}`)
  // const orderData = response.data

  // const storeData = await getStoreDetail(orderData.shopId)
  // const latitude = storeData.storeDetail.info.shopAddressResponse.latitude,
  //   longitude = storeData.storeDetail.info.shopAddressResponse.longitude

  // return Object.assign(orderData, { lat: latitude, lng: longitude })

  const data = await getStoreDetail(10)
  const latitude = data.storeDetail.info.shopAddressResponse.latitude,
    longitude = data.storeDetail.info.shopAddressResponse.longitude,
    mockOrder = {
      result: true,
      status: 200,
      message: '주문 내역 조회에 성공하였습니다.',
      data: {
        orderUid: '2023091209076e668873', // 주문번호
        createdAt: '2023-09-12 21:08:55', // 주문시간
        shopName: 'BBQ-교대본점', // 가게명
        shopId: 11410, // 가게ID
        orderName: '파인애플피자 1개 외 2개', // 주문명
        orderMenus: [
          // 주문한 메뉴들
          {
            price: 10000, // 가격
            name: '파인애플피자 x 1', // 메뉴명과 수량
            options: [
              {
                optionPrice: 1000, // 메뉴옵션가격
                optionName: 'tomato x 1', // 메뉴옵션명과 수량
              },
            ],
          },
          {
            price: 38000,
            name: '메뉴이름 x 2',
            options: [
              {
                optionPrice: 1000,
                optionName: '불닭 x 2',
              },
              {
                optionPrice: 5000,
                optionName: '콜라 x 2',
              },
            ],
          },
        ],
        defaultDeliveryPrice: 2000, // 배달비
        totalPrice: 57000, // 총결제금액
        buyerCouponDiscount: 0, // 쿠폰할인
        orderStatus: 'PAID', // 주문상태
        address: '서울특별시 강서구 초록마을로 26길 ', // 배달주소
        payMethod: 'KakaoPay', // 결제방법
        phoneNum: '010-8888-9999', // 소비자 전화번호
        shopTelphoneNum: '02-123-1234', // 가게 전화번호
        canceledAt: null, // 취소시간(결제 취소된 시간)
        latitude,
        longitude,
      },
    }

  return mockOrder.data
}

type Order = {
  orderId: number
  orderUid: string
  shopName: string
  shopId: number // 가게ID
  bannerImg: string
  menus: string[]
  options: string[]
  orderDateTime: string
  orderStatus: string
}

type Orders = {
  content: Order[]
  cursor: number
  size: number
  end: boolean
}

export const getOrders = async (): Promise<Orders> => {
  // const cursor = 10,
  //   size = 10
  // const response = await axiosClient.get(`orders?cursor=${cursor}&size=${size}`)
  // return response.data

  const mockData = {
    result: true,
    status: 200,
    message: '성공적으로 주문내역을 조회했습니다.',
    data: {
      content: [
        {
          orderId: 1,
          orderUid: '202309110117777bdd7b',
          shopName: 'BBQ-교대본점',
          shopId: 11410, // 가게ID
          bannerImg:
            'https://hanyipman3.s3.ap-northeast-2.amazonaws.com/%2F%2Fshop/10/69ddc5d9-2c55-4edb-bce9-10b32e8ee299',
          menus: ['파인애플피자 x 3', '파인애플피자 x 3', '파인애플피자 x 3'],
          options: [
            'tomato x 3, mustard x 3',
            'tomato x 3, mustard x 3',
            'tomato x 3, mustard x 3',
          ],
          totalPrice: 108000,
          orderDateTime: '2023-09-11 13:17:58',
          orderStatus: 'WAIT',
        },
        {
          orderId: 2,
          orderUid: '202309120158dba7d066',
          shopName: 'BBQ-교대본점',
          shopId: 11410, // 가게ID
          bannerImg:
            'https://hanyipman3.s3.ap-northeast-2.amazonaws.com/%2F%2Fshop/10/69ddc5d9-2c55-4edb-bce9-10b32e8ee299',
          menus: ['파인애플피자 x 3', '파인애플피자 x 3'],
          options: [],
          orderDateTime: '2023-09-12 13:58:26',
          orderStatus: 'WAIT',
        },
      ],
      cursor: 10,
      size: 10,
      end: true,
    },
  }
  return mockData.data
}

export const getOrdersInf = async (cursor: number) => {
  const size = 2
  const reviewInfResponse = await axiosClient.get(`orders?cursor=${cursor}&size=${size}`)
  return reviewInfResponse.data
}
