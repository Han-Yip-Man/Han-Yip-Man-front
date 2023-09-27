import { Card, Stack, TextField, styled } from '@mui/material'

export const CardWrap = styled(Card)`
  display: 'flex';
  flex-direction: 'column';
  padding: 16px;
  border-radius: 20px;
  background: linear-gradient(332deg, #f69f86, #f69f86 30%, #fcd797);
  input[type='file'] {
    border: none;
  }
  input[type='submit'] {
    width: 200px;
    height: 50px;
    margin: 30px 0 0 150px;
    border: none;
    border-radius: 20px;
    font: inherit;
    font-size: 1.25rem;
  }
`

export const RatingStack = styled(Stack)`
  width: 500px;
  > label {
    margin-right: 50px;
  }
`

export const ImageStack = styled(Stack)`
  width: 500px;
  align-items: center;
  > label {
    margin-right: 50px;
  }
  > img {
    margin: 8px;
    padding: 8px;
    border: 1px solid #fbcf94;
    border-radius: 8px;
  }
`

export const ContentStack = styled(Stack)`
  width: 500px;
  > label {
    margin-right: 50px;
  }
`

export const StyledTextField = styled(TextField)`
  width: 80%;
`
