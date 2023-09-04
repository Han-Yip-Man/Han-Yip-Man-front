import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material'
import React from 'react'

interface ProfileProps {
  setMenupage: (value: number) => void
}

const RestaurantsProfile: React.FC<ProfileProps> = ({ setMenupage }) => {
  return (
    <Wrapper>
      <ProfileBtnWrapper>
        <StyledButton variant="outlined" onClick={() => setMenupage(6)}>
          가게 정보수정
        </StyledButton>
        <StyledButton variant="outlined" onClick={() => setMenupage(7)}>
          가게 신규등록
        </StyledButton>
      </ProfileBtnWrapper>
      <ProfileWrapper>
        <StyledCard>
          <CardContent>
            <TitleTypography variant="h4" align="center" gutterBottom>
              티엔미미 신촌점
            </TitleTypography>
            <Grid container spacing={2}>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Card elevation={0}>
                  <CardMedia component="img" alt="메인 사진" height="200" image="/img/ordertest.jpg" />
                  <Imgdescription>
                    <Typography variant="body2" color="textSecondary" component="p">
                      대표 이미지
                    </Typography>
                  </Imgdescription>
                </Card>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Card elevation={0}>
                  <CardMedia component="img" alt="배너 사진" height="200" image="/img/ordertest.jpg" />
                  <Imgdescription>
                    <Typography variant="body2" color="textSecondary" component="p">
                      배너 이미지
                    </Typography>
                  </Imgdescription>
                </Card>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              <Grid item xs={3}>
                <Typography>전화번호 :</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>02-123-4567</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>위치 :</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>경기도 서울시 부산동</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>사업자번호 :</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>01-123-45678</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>카테고리 :</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>치킨</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>최소주문금액 :</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>14,000 원</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </ProfileWrapper>
    </Wrapper>
  )
}

export default RestaurantsProfile

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
`
const ProfileBtnWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding-right: 30px;
`

const StyledButton = styled(Button)`
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
const ProfileWrapper = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  justify-content: center;
`

const StyledCard = styled(Card)`
  width: 800px;
  height: 650px;
  padding: 30px;
  margin-top: 40px;
`

const Imgdescription = styled(CardContent)`
  height: 40px;
  text-align: center;
  border: none;
`
const TitleTypography = styled(Typography)`
  margin-bottom: 40px;
`
