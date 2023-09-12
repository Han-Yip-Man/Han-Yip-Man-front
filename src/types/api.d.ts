// 유저 회원가입
declare interface UserSignUpPayload {
  address?: string
  addressDetail?: string
  email?: string
  latitude: number
  longitude: number
  nickName?: string
  password?: string
  passwordCheck?: string
  phoneNumber?: string
  profileImageFile: string
}

declare interface OwnerSignUpPayload {
  businessNumber?: string
  email?: string
  nickName?: string
  password?: string
  passwordCheck?: string
  phoneNumber?: string
}

//로그인 공통
declare interface SignInType {
  email?: string
  password?: string
}

declare interface EmailCheckType {
  checkEmail?: string
}
