const CLIENT_ID = 'd1d67d3d0c029ec63bff82955f1f5976'
const REDIRECT = 'http://54.180.103.214:8080/auth/kakao'

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=code`
