import styled from '@emotion/styled'

export const CouponWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Title = styled.div`
  width: 100px;
  margin: 30px 0 30px 0;
  h2 {
    font-size: 30px;
  }
`

export const CouponInputbox = styled.div`
  display: flex;
  gap: 40px;
  input {
    width: 300px;
  }
`
export const Couponlist = styled.div`
  width: 90%;
  padding: 30px;
  overflow-y: auto;
  margin-top: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
  .MuiCard-root {
    width: 100%;
    margin-bottom: 30px;
  }
`
