import styled from '@emotion/styled'
import { Typography } from '@mui/material'

const LoadingSpinner = () => {
  return (
    <Wrap>
      <Loading src={'/svg/eater3.svg'} />
      <div>
        <Text>로딩중</Text>
      </div>
    </Wrap>
  )
  // <Wrap>
  //   <div></div>
  //   <div></div>
  //   <div></div>
  //   <div></div>
  // </Wrap>
}

export default LoadingSpinner

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled(Typography)`
  display: flex;
  justify-content: center;

  font-size: 20px;
`

const Loading = styled.img`
  background: transparent;
`

// const Wrap = styled.div`
//   display: inline-block;
//   position: relative;
//   width: 300px;
//   height: 80px;

//   & div {
//     position: absolute;
//     top: 33px;
//     width: 33px;
//     height: 33px;
//     border-radius: 50%;
//     background: orange;
//     animation-timing-function: cubic-bezier(0, 1, 1, 0);
//   }

//   & div:nth-child(1) {
//     left: 15px;
//     animation: lds-ellipsis1 0.6s infinite;
//   }
//   & div:nth-child(2) {
//     left: 15px;
//     animation: lds-ellipsis2 0.6s infinite;
//   }
//   & div:nth-child(3) {
//     left: 60px;
//     animation: lds-ellipsis2 0.6s infinite;
//   }
//   & div:nth-child(4) {
//     left: 105px;
//     animation: lds-ellipsis3 0.6s infinite;
//   }

//   @keyframes lds-ellipsis1 {
//     0% {
//       transform: scale(0);
//     }
//     100% {
//       transform: scale(1);
//     }
//   }
//   @keyframes lds-ellipsis3 {
//     0% {
//       transform: scale(1);
//     }
//     100% {
//       transform: scale(0);
//     }
//   }
//   @keyframes lds-ellipsis2 {
//     0% {
//       transform: translate(0, 0);
//     }
//     100% {
//       transform: translate(24px, 0);
//     }
//   }
// `
