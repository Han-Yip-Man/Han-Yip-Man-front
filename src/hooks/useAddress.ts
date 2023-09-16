import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { dataState } from '../atoms/mainAtoms'
import searchAddressByKeyword from '../api/addressSearch'

const useAddress = (keyword: string) => {
  const [data, setData] = useRecoilState<DataType[]>(dataState)
  const [reqStatus, setStatus] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (keyword === '') {
      setData([])
      setMsg('검색어를 입력해주쇼!!! 😁')
      return
    }

    searchAddressByKeyword(keyword, (addr: any, status: any) => {
      setStatus(() => status)
      switch (status) {
        case 'OK':
          setData(() => addr)
          setMsg('')
          return
        case 'ZERO_RESULT':
          setData([])
          setMsg('검색 결과가 없는뎁쇼?😁')
          return
        case 'ERROR':
          setData([])
          setMsg('검색어를 똑바로 입력해주쇼!!!')
          return
      }
    })
  }, [keyword])

  return {
    data,
    setData,
    status: reqStatus,
    msg,
  }
}

export default useAddress
