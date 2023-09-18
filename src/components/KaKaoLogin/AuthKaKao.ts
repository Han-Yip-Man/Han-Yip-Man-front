const CLIENT_ID = 'd1d67d3d0c029ec63bff82955f1f5976'
const REDIRECT = 'http://localhost:5173/auth/kakao/callback'

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=code`
// export const KAKAO_AUTH_URL = `kauth.kakao.com/oauth/authorize?client_id=d1d67d3d0c029ec63bff82955f1f5976&redirect_uri=http://54.180.103.214:8080/auth/kakao/callback&response_type=code`
