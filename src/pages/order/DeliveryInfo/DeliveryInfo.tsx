import * as S from './DeliveryInfo.Styles'
import IconClock from '../../../assets/iconClock.svg'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { UserStateAtom } from '../../../atoms/orderAtoms'
import { userAddr } from '../../../atoms/addressAtoms'
import { getMypageInfo } from '../../customerMypage/hooks/mypage'

type MypageInfo = {
  userNumber: number
  buyNumber: number
  sellerNumber: number | undefined
  email: string
  phoneNumber: string
  nickName: string
  businessNumber: number | undefined
  role: string
  profileImageUrl: string
  addressList: Address[]
}

type Address = {
  addressNumber: number
  address: string
  detailAddress: string
  latitude: number
  longitude: number
  isDefault: boolean
}

const DeliveryInfo = () => {
  // const queryClient = useQueryClient()

  // const { data: MyPageData } = useQuery(['/users/my-info'], () => getMypageInfo())
  // console.log(MyPageData)
  const [orderUserInfo, setOrderUserInfo] = useRecoilState(UserStateAtom)

  const phoneMidInput: HTMLInputElement | null = document.getElementById(
    'phoneMidInput',
  ) as HTMLInputElement

  if (phoneMidInput) {
    phoneMidInput.maxLength = 4
  }

  const [selectedOption, setSelectedOption] = useState('')
  const [isCustomInputVisible, setCustomInputVisible] = useState(false)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }
  const address = useRecoilValue(userAddr)

  useEffect(() => {
    if (selectedOption === '직접 입력') {
      setCustomInputVisible(true)
    } else {
      setCustomInputVisible(false)
    }
  }, [selectedOption])

  // useEffect(() => {
  //   setOrderItems({ buyerCouponId }).then((response: AxiosResponse) => {
  //     console.log(response)
  //   })
  // }, [])

  useEffect(() => {
    getMypageInfo().then((response: MypageInfo) => {
      console.log('MypageInfo', response)
      setOrderUserInfo(response)
    })
  }, [])

  return (
    <S.OuterDiv>
      <S.TopDiv>
        <S.TitleDiv>결제하기</S.TitleDiv>
      </S.TopDiv>
      <S.ItemTable>
        <S.Thead>
          <S.Title>
            <S.Td1Title>배달 정보</S.Td1Title>
          </S.Title>
        </S.Thead>
        <S.Tbody>
          <S.TableRow>
            <S.Td1>
              <S.Td1InnerDiv>
                <S.AdrsDiv>
                  <S.AdrsLeftDiv>배달주소</S.AdrsLeftDiv>
                  <S.AdrsRightDiv>
                    {orderUserInfo?.addressList?.[0]?.address}
                    {orderUserInfo?.addressList[0]?.detailAddress}
                  </S.AdrsRightDiv>
                  {/* <S.AdrsChangeButton>주소 변경</S.AdrsChangeButton> */}
                </S.AdrsDiv>
                <S.EstimatedTimeDiv>
                  <S.ETALeftDiv>배달 예정 시간</S.ETALeftDiv>
                  <S.ETARightDiv>
                    <S.ClockImg src={IconClock} />
                    0~2분 후 도착
                  </S.ETARightDiv>
                </S.EstimatedTimeDiv>

                <S.PhoneNumberDiv>
                  <S.PNLeftDiv>연락처</S.PNLeftDiv>
                  <S.PNRightDiv>
                    <S.PNSelectBox>
                      <option value="010">010</option>
                      <option value="011">011</option> {/* 010 외에 없어지지 않았나? */}
                      <option value="016">016</option> {/* 010 외에 없어지지 않았나? */}
                      <option value="017">017</option> {/* 010 외에 없어지지 않았나? */}
                      <option value="018">018</option> {/* 010 외에 없어지지 않았나? */}
                      <option value="019">019</option> {/* 010 외에 없어지지 않았나? */}
                    </S.PNSelectBox>
                    <S.PNMiddleInput
                      type="text"
                      id="phoneMidInput"
                      value={orderUserInfo?.phoneNumber.slice(3, 7)}
                      readOnly
                    />
                    <S.PNLastInput
                      type="text"
                      value={orderUserInfo?.phoneNumber.slice(7)}
                      readOnly
                    />
                  </S.PNRightDiv>
                </S.PhoneNumberDiv>

                <S.OrderRequestDiv>
                  <S.ORLeftDiv>요청사항</S.ORLeftDiv>
                  <S.ORRightDiv>
                    <S.RqSelectBox onChange={handleSelectChange}>
                      <option>요청사항을 선택하세요.</option>
                      <option>문 앞에 놓아 주세요.</option>
                      <option>벨은 누르지 말아주세요.</option>
                      <option value="직접 입력">직접 입력</option>
                    </S.RqSelectBox>
                    <S.RqInput type="checkbox" />
                    <S.RqCheckBoxNextDiv> 요청사항 다음에도 사용</S.RqCheckBoxNextDiv>
                  </S.ORRightDiv>
                </S.OrderRequestDiv>
                {isCustomInputVisible && (
                  <S.HiddenInput placeholder="주문시 요청사항을 입력하세요." />
                )}
              </S.Td1InnerDiv>
            </S.Td1>
          </S.TableRow>
        </S.Tbody>
      </S.ItemTable>
    </S.OuterDiv>
  )
}
export default DeliveryInfo
