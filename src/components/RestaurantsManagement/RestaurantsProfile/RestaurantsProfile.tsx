import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material'
import React from 'react'
import * as S from './RestaurantsProfile.style'

interface ProfileProps {
  setMenupage: (value: number) => void
}

const RestaurantsProfile: React.FC<ProfileProps> = ({ setMenupage }) => {
  return (
    <S.Wrapper>
      <S.ProfileBtnWrapper>
        <S.StyledButton variant="outlined" onClick={() => setMenupage(6)}>
          가게 정보수정
        </S.StyledButton>
        <S.StyledButton variant="outlined" onClick={() => setMenupage(7)}>
          가게 신규등록
        </S.StyledButton>
      </S.ProfileBtnWrapper>
      <S.ProfileWrapper>
        <S.StyledCard>
          <CardContent>
            <S.TitleTypography variant="h4" align="center" gutterBottom>
              티엔미미 신촌점
            </S.TitleTypography>
            <Grid container spacing={2}>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Card elevation={0}>
                  <CardMedia
                    component="img"
                    alt="메인 사진"
                    height="200"
                    image="/img/ordertest.jpg"
                  />
                  <S.Imgdescription>
                    <Typography variant="body2" color="textSecondary" component="p">
                      대표 이미지
                    </Typography>
                  </S.Imgdescription>
                </Card>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Card elevation={0}>
                  <CardMedia
                    component="img"
                    alt="배너 사진"
                    height="200"
                    image="/img/ordertest.jpg"
                  />
                  <S.Imgdescription>
                    <Typography variant="body2" color="textSecondary" component="p">
                      배너 이미지
                    </Typography>
                  </S.Imgdescription>
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
        </S.StyledCard>
      </S.ProfileWrapper>
    </S.Wrapper>
  )
}

export default RestaurantsProfile
