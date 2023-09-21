import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material'
import * as S from './RestaurantsProfile.style'
import { useSetRecoilState } from 'recoil'
import { shopdeletemodal } from '../../../recoil/restaurants'
import RestaurantDeleteModal from '../RestaurantDeleteModal/RestaurantDeleteModal'
import { sellerDashboardNum } from '../../../recoil/restaurants'
import { useGetshopDeatil } from '../../../hooks/useGetshopDeatil'

const RestaurantsProfile = () => {
  const ModalOpen = useSetRecoilState(shopdeletemodal)
  const pageset = useSetRecoilState(sellerDashboardNum)
  const { shop } = useGetshopDeatil()
  const formatPrice = shop.minOrderPrice.toLocaleString('ko-KR')
  const thumbnailUrlImg = shop.thumbnailUrl ? shop.thumbnailUrl : '/img/shopdefault.jpg'
  const bannerUrlImg = shop.bannerUrl ? shop.bannerUrl : '/img/shopdefault.jpg'

  console.log(shop)

  return (
    <S.Wrapper>
      <S.ProfileBtnWrapper>
        {shop && (
          <S.StyledButton variant="outlined" onClick={() => ModalOpen(true)}>
            가게 삭제하기
          </S.StyledButton>
        )}
        <S.StyledButton variant="outlined" onClick={() => pageset(6)}>
          가게 정보수정
        </S.StyledButton>
        <S.StyledButton variant="outlined" onClick={() => pageset(7)}>
          가게 신규등록
        </S.StyledButton>
      </S.ProfileBtnWrapper>
      {shop ? (
        <S.ProfileWrapper>
          <S.StyledCard>
            <CardContent>
              <S.TitleTypography variant="h4" align="center" gutterBottom>
                {shop.shopName}
              </S.TitleTypography>
              <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  <Card elevation={0}>
                    <CardMedia
                      component="img"
                      alt="메인 사진"
                      height="200"
                      image={thumbnailUrlImg}
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
                    <CardMedia component="img" alt="배너 사진" height="200" image={bannerUrlImg} />
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
                  <Typography>{shop.shopPhone}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>위치 :</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{shop.address}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>사업자번호 :</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{shop.businessNumber}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>카테고리 :</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{shop.categoryName}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>최소주문금액 :</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{formatPrice} 원</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>가게설명 :</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{shop.shopDescription}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </S.StyledCard>
          <RestaurantDeleteModal />
        </S.ProfileWrapper>
      ) : (
        <S.ProfileWrapper>
          <S.ImgContainer>
            <S.DefaultImgBox>
              <img src="/img/profiledefault.jpg" alt="" />
            </S.DefaultImgBox>
          </S.ImgContainer>
        </S.ProfileWrapper>
      )}
    </S.Wrapper>
  )
}

export default RestaurantsProfile
