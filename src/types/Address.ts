export interface DaumPostcodeData {
  zonecode?: string // 우편번호
  address?: string // 기본 주소
  addressEnglish?: string // 기본 주소 (영어)
  addressType?: string // 주소 유형 (R: 도로명주소, J: 지번주소)
  userSelectedType?: string // 사용자가 선택한 주소 유형
  roadAddress?: string // 도로명 주소
  roadAddressEnglish?: string // 도로명 주소 (영어)
  jibunAddress?: string // 지번 주소
  jibunAddressEnglish?: string // 지번 주소 (영어)
  bname?: string // 법정동명
  buildingName?: string // 건물명
  apartment?: string // 아파트명
  coordinates?: {
    latitude: string | undefined
    longitude: string | undefined
  } | null
}
