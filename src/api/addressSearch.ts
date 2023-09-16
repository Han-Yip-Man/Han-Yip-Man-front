const ps = new window.kakao.maps.services.Places()

const searchAddressByKeyword = (keyword: string, callback: any) => {
  ps.keywordSearch(keyword, callback)
}

export default searchAddressByKeyword
