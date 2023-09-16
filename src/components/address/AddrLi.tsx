import styled from '@emotion/styled'
import { useSetRecoilState } from 'recoil'
import { keyword, focusState, dataState } from '../../atoms/mainAtoms'

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
        <Li>
          <AddrName>{msg}</AddrName>
        </Li>
      ) : (
        <Li onClick={handleClick} style={{ backgroundColor: active ? '#ddd' : '#fff' }}>
          <AddrName>{data?.place_name}</AddrName>
          <AddrRoad>{data?.road_address_name}</AddrRoad>
        </Li>
      )}
    </>
  )
}

export default AddrLi

const Li = styled.li`
  display: grid;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  padding-left: 30px;
  cursor: pointer;
  position: relative;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: rgb(128, 128, 128, 0.2) !important;
  }
`

const AddrName = styled.h3`
  padding-top: 20px;
  font-weight: bold;
`
const AddrRoad = styled.p`
  margin-top: 10px;
  color: gray;
`
