import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { Typography, Card, CardContent } from '@mui/material'

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
`
export const ProfileBtnWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding-right: 30px;
`

export const StyledButton = styled(Button)`
  color: #ea7600;
  background-color: #fff;
  border-color: #ea7600;
  padding: 7px 20px;
  &:hover {
    color: #fff;
    background-color: #ea7600;
    border-color: #ea7600;
  }
`
export const ProfileWrapper = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  justify-content: center;
`

export const StyledCard = styled(Card)`
  width: 800px;
  height: 650px;
  padding: 30px;
  margin-top: 40px;
`

export const Imgdescription = styled(CardContent)`
  height: 40px;
  text-align: center;
  border: none;
`
export const TitleTypography = styled(Typography)`
  margin-bottom: 40px;
`
