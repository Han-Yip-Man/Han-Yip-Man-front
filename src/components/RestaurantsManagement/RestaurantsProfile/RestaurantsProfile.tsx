import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import * as S from './RestaurantsProfile.style'
import { getShopDetail } from '../../../api/restaurant'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { selectedShopIdState } from '../../../recoil/restaurants'
import { shopDetailState, shopdeletemodal } from '../../../recoil/restaurants'
import { useRecoilState } from 'recoil'
import RestaurantDeleteModal from '../RestaurantDeleteModal/RestaurantDeleteModal'

interface ProfileProps {
  setMenupage: (value: number) => void
}

const RestaurantsProfile: React.FC<ProfileProps> = ({ setMenupage }) => {
  const currentId = useRecoilValue(selectedShopIdState)
  const [shop, setShop] = useRecoilState(shopDetailState)
  const ModalOpen = useSetRecoilState(shopdeletemodal)

  useEffect(() => {
    const getDatil = async () => {
      if (currentId !== undefined) {
        try {
          const response = await getShopDetail(currentId)
          console.log(response)
          setShop(response)
        } catch (error) {
          console.error('에러', error)
        }
      }
    }

    getDatil()
  }, [currentId])

  console.log(currentId)

  const formatPrice = shop.minOrderPrice.toLocaleString('ko-KR')

  return (
    <S.Wrapper>
      <S.ProfileBtnWrapper>
        {currentId && (
          <S.StyledButton variant="outlined" onClick={() => ModalOpen(true)}>
            가게 삭제하기
          </S.StyledButton>
        )}
        <S.StyledButton variant="outlined" onClick={() => setMenupage(6)}>
          가게 정보수정
        </S.StyledButton>
        <S.StyledButton variant="outlined" onClick={() => setMenupage(7)}>
          가게 신규등록
        </S.StyledButton>
      </S.ProfileBtnWrapper>
      {currentId ? (
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
                      image={shop.thumbnailUrl}
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
                      image={shop.bannerUrl}
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
