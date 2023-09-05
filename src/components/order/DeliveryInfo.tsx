import * as S from './DeliveryInfo.Styles'
import IconClock from '../../assets/iconClock.svg'

const DeliveryInfo = () => {
  const phoneMidInput: HTMLInputElement | null = document.getElementById('phoneMidInput') as HTMLInputElement

  if (phoneMidInput) {
    phoneMidInput.maxLength = 4
  }

  return (
    <S.OuterDiv>
      <S.TopDiv>
        <S.TitleDiv>결제하기</S.TitleDiv>
      </S.TopDiv>
      <S.ItemTable>
        <S.Title>
          <S.Td1Title>배달 정보</S.Td1Title>
        </S.Title>
        <S.Thead>
          <S.Td1>
            <S.Td1InnerDiv>
              <S.AdrsDiv>
                <S.AdrsLeftDiv>배달주소</S.AdrsLeftDiv>
                <S.AdrsRightDiv>서울시 당당구 댕댕동</S.AdrsRightDiv>
              </S.AdrsDiv>
              <S.EstimatedTimeDiv>
                <S.ETALeftDiv>배달 예정 시간</S.ETALeftDiv>
                <S.ETARightDiv>
                  <S.ClockImg src={IconClock} />
                  20~30분 후 도착
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
                  <S.PNMiddleInput type="text" id="phoneMidInput" />
                  <S.PNLastInput type="text" />
                </S.PNRightDiv>
              </S.PhoneNumberDiv>

              <S.OrderRequestDiv>
                <S.ORLeftDiv>요청사항</S.ORLeftDiv>
                <S.ORRightDiv>
                  <S.RqSelectBox>
                    <option>요청사항을 선택하세요.</option>
                    <option>문 앞에 놓아 주세요.</option>
                    <option>벨은 누르지 말아주세요.</option>
                    <option>직접 입력</option>
                  </S.RqSelectBox>
                  <S.RqInput type="checkbox" />
                  <S.RqCheckBoxNextDiv> 요청사항 다음에도 사용</S.RqCheckBoxNextDiv>
                </S.ORRightDiv>
              </S.OrderRequestDiv>
              <S.HiddenInput placeholder="주문시 요청사항을 입력하세요. (display:none;)" />
            </S.Td1InnerDiv>
          </S.Td1>
        </S.Thead>
      </S.ItemTable>
    </S.OuterDiv>
  )
}
export default DeliveryInfo