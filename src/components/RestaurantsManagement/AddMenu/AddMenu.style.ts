import styled from '@emotion/styled'
import InputField from '../../common/InputField'
import Select from '@mui/material/Select'

export const DetailBtnbox = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  height: 140px;
  gap: 10px;
  button {
    height: 56px;
  }
`

export const DetailWriting = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  height: 140px;
`

export const DetailoptionContainer = styled.div`
  display: flex;
  padding-top: 30px;
  width: 100%;
  gap: 50px;
  justify-content: center;
  align-items: center;
`

export const Detailli = styled.li`
  margin-left: 30px;
  margin-top: 3px;
  font-size: 15px;
`

export const Stylelist = styled.li`
  margin-bottom: 30px;
  font-size: 18px;
  padding: 20px;
  border-bottom: 1px solid #333;
  position: relative;
`

export const Optiondeletebtn = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  width: 15px;
  height: 15px;
  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    &:hover {
      filter: invert(10%) sepia(91%) saturate(5889%) hue-rotate(14deg) brightness(96%)
        contrast(123%);
    }
  }
`

export const StyledSelect = styled(Select)`
  width: 60px;
  height: 40px;

  .MuiSelect-select {
    padding: 10px;
  }
`

export const CheckWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 80%;
  label {
    display: flex;
    align-items: center;
  }
`

export const OptionCheck = styled.input`
  width: 25px;
  height: 25px;
`

export const CateTitle = styled.h3`
  margin-bottom: 20px;
`

export const OptionCateContainer = styled.div`
  border-top: 1px solid #000;
  width: 95%;
  margin: 30px auto 0 auto;
  display: flex;
  justify-content: center;
`

export const OptionCatebox = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyleInput = styled(InputField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const PreviewBox = styled.div`
  position: relative;
  width: 190px;
  height: 190px;
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

export const ImageDescription = styled.span`
  font-size: 14px;
`

export const Menubox = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  margin: 20px auto;
  width: 90%;
  gap: 50px;
`

export const ImgContainer = styled.div`
  width: 30%;
  text-align: center;
`

export const TextContainer = styled.div`
  flex: 1;
`

export const StyleSelect = styled(Select)`
  width: 220px;
  height: 50px;
`

export const Wrapper = styled.form`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
`

export const CategorySelectbox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  padding-left: 30px;
  align-items: center;
`

export const WritingContainer = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
`

export const MenuWritingWrapper = styled.div`
  width: 60%;
  height: 100%;
`
export const MenuOptionView = styled.div`
  width: 40%;
  max-height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const AddMenuBtnbox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;

  Button {
    height: 50px;
    width: 40%;
    font-size: 25px;
  }
`
