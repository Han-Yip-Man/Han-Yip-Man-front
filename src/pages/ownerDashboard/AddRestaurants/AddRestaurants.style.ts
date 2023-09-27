import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { Select } from '@mui/material'

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  justify-content: center;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const FormFrame = styled.div`
  width: 50%;
`

export const BackBtn = styled.img`
  position: absolute;
  left: 30px;
  top: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

export const Addtitle = styled.div`
  text-align: center;
  margin: 20px 0;
  h1 {
    font-size: 25px;
    font-weight: 500;
  }
`

export const ImageUploadContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-bottom: 30px;
`

export const PreviewBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 95%;
    height: 95%;
    object-fit: cover;
    cursor: pointer;
  }

  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ImageDescription = styled.span`
  font-size: 14px;
`

export const SubmitButton = styled(Button)`
  width: 100%;
  font-size: 20px;
  margin-bottom: 40px;
`

export const StyleSelect = styled(Select)`
  width: 100%;
  margin-bottom: 30px;
`

export const AddressBtnbox = styled.div`
  display: flex;
  height: 56px;
  width: 100%;
  gap: 30px;
  margin-bottom: 30px;
`

export const AddressBtn = styled(Button)`
  width: 500px;
  font-size: 18px;
`
