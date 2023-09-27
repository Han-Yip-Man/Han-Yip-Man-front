import { Box, CardMedia, Rating, Stack, Typography, styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { orderShopid } from '../../../atoms/orderAtoms'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import BasicTabs from '../basicTabs/BasicTabs'
import * as S from './Store.style'
import useStore from '../hooks/useStore'

const Store = () => {
  const { storeId } = useParams()
  const { data, isLoading } = useStore(Number(storeId))

  const setShopid = useSetRecoilState(orderShopid)

  useEffect(() => {
    setShopid(Number(storeId))
  }, [])

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <S.StoreWrap>
          <Box>
            <CardMedia component="img" image={data?.storeDetail.info.bannerUrl} alt="banner" />
          </Box>
          <S.StyledStoreInfoBox>
            <Typography variant="h4">{data?.storeDetail.info.shopName}</Typography>
            <Typography variant="h6">{data?.storeDetail.info.description}</Typography>
            <Rating name="rating" defaultValue={data?.storeDetail.rvAvg} precision={0.1} readOnly />
            <Typography>리뷰 N개</Typography>
          </S.StyledStoreInfoBox>
          <BasicTabs />
        </S.StoreWrap>
      )}
    </>
  )
}

export default Store
