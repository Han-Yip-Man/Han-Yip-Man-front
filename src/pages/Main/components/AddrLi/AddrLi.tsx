import { useSetRecoilState } from 'recoil'
import { keyword, focusState, dataState } from '../../../../atoms/mainAtoms'
import * as S from './AddrLi.styles'

interface Props<T> {
  data?: T
  msg?: string
  active?: boolean
  resetCurrentIndex?: () => void
}

function AddrLi({ data, msg, active, resetCurrentIndex }: Props<DataType>) {
  const setInputKeyword = useSetRecoilState(keyword)
  const setIsFocused = useSetRecoilState(focusState)
  const setData = useSetRecoilState(dataState)

  const handleClick = () => {
    if (!data) return
    // 상태 업데이트의 동기적 순서를 보장하기 위해 함수형 업데이트
    setInputKeyword(() => `${data.place_name}`)
    setData(() => [data])
    setIsFocused(false)
    if (!resetCurrentIndex) return
    resetCurrentIndex()
  }

  return (
    <>
      {msg ? (
        <S.Li>
          <S.AddrName>{msg}</S.AddrName>
        </S.Li>
      ) : (
        <S.Li onClick={handleClick} style={{ backgroundColor: active ? '#ddd' : '#fff' }}>
          <S.AddrName>{data?.place_name}</S.AddrName>
          <S.AddrRoad>{data?.road_address_name}</S.AddrRoad>
        </S.Li>
      )}
    </>
  )
}

export default AddrLi
