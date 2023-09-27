import styled from '@emotion/styled'
import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSocketContext } from '../../../hooks'

const ChatRoom = ({ fullScreen, open, onClose, orderId }: any) => {
  const [value, setValue] = useState('')
  const { socket } = useSocketContext()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    socket?.emit(
      'send_message',
      {
        type: 'SELLER',
        message: value,
        room: `chat${orderId}`,
      },
      (res: any) => {
        console.log(res)
      },
    )
    setValue('')
  }

  useEffect(() => {
    socket?.emit('room_enter', `chat${orderId}`, () => {
      socket.on('get_message', (res) => {
        console.log(res)
      })
    })
  }, [socket])

  return (
    <CustomDialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogContent>
        <DialogContentText component="div">
          <Wrapper>
            <ChatWrap>
              <ChatBox>
                음식 개 맛없네 ㅡㅡ
                ㅁㄴ이ㅏㅓㅁ니아ㅓㅁㄴ이ㅏㅁ너이ㅏㅓㅁㅇㅀㅇㄹㄶㅇㄴㅀㅇㄹㄶㅇㄹㄶㅇㅀㄹㅇㅎㄴ
              </ChatBox>
              <ProfileWrap>
                <Profile>본인</Profile>
              </ProfileWrap>
            </ChatWrap>
            <div>채팅111111</div>
            <div>채팅111111</div>
            <div>채팅111111</div>
            <div>채팅111111</div>
            <div>채팅111111</div>
            <div>채팅111111</div>
            <div>채팅111111</div>
            <div>채팅111111</div>
            <div>채팅111111</div>
          </Wrapper>
        </DialogContentText>
        <InputWrap onSubmit={onSubmit}>
          <Input value={value} onChange={({ target }) => setValue(target.value)} />
          <Btn type="submit">입력</Btn>
        </InputWrap>
      </DialogContent>
    </CustomDialog>
  )
}

export default ChatRoom

const CustomDialog = styled(Dialog)`
  display: grid;
  place-content: center;
`

const Wrapper = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 15px;
`
const InputWrap = styled.form`
  height: 40px;
  background-color: gray;
  display: grid;
  grid-template-columns: 4fr 1fr;
`

const Input = styled.input`
  font-family: 'bae';
`

const Btn = styled.button``

const ChatWrap = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
`
const ProfileWrap = styled.div`
  place-items: center;
`

const Profile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
  display: grid;
  place-content: center;
`

const ChatBox = styled.div`
  font-size: 14px;
  color: black;
`
