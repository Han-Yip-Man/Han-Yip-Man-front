import { Box, CardMedia, Rating, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { orderShopid } from '../../../atoms/orderAtoms'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import BasicTabs from '../basicTabs/BasicTabs'
import * as S from './Shop.style'
import useShop from '../hooks/useShop'

const Shop = () => {
  const { shopId } = useParams()
  const { data, isLoading } = useShop(Number(shopId))

  const setShopid = useSetRecoilState(orderShopid)

  useEffect(() => {
    setShopid(Number(shopId))
  }, [])

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <S.ShopWrap>
          <Box>
            <CardMedia component="img" image={data?.shopDetail.info.bannerUrl} alt="banner" />
          </Box>
          <S.StyledShopInfoBox>
            <Typography variant="h4">{data?.shopDetail.info.shopName}</Typography>
            <Typography variant="h6">{data?.shopDetail.info.description}</Typography>
            <Rating name="rating" defaultValue={data?.shopDetail.rvAvg} precision={0.1} readOnly />
            <Typography>리뷰 N개</Typography>
          </S.StyledShopInfoBox>
          <BasicTabs />
        </S.ShopWrap>
      )}
    </>
  )
}

export default Shop
