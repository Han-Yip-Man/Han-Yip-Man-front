import Mypage from '../../components/mypage/Mypage'
import styled from '@emotion/styled'

const CustomerMypage = () => {
  return (
    <Wrapper>
      <Mypage />
    </Wrapper>
  )
}

export default CustomerMypage

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
