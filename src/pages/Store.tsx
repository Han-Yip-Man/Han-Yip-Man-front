import { useQuery } from '@tanstack/react-query'
import { getStoreDetail } from '../api/storeDetail'
import BasicTabs from '../components/store/BasicTabs'
import { Box, CardMedia, Rating, Stack, Typography, styled } from '@mui/material'
import { useState } from 'react'

export const Store = () => {
  const [shopId] = useState(10)
  const { data, isLoading } = useQuery(['stores', shopId], () => getStoreDetail(shopId))
  // console.log(data)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <StoreWrap>
          <Box>
            <CardMedia component="img" image={data?.storeDetail.info.bannerUrl} alt="banner" />
          </Box>
          <StyledStoreInfoBox>
            <Typography variant="h4">{data?.storeDetail.info.shopName}</Typography>
            <Typography variant="h6">{data?.storeDetail.info.description}</Typography>
            <Rating name="rating" defaultValue={data?.storeDetail.rvAvg} precision={0.1} readOnly />
            <Typography>리뷰 N개</Typography>
          </StyledStoreInfoBox>
          <BasicTabs />
        </StoreWrap>
      )}
    </>
  )
}

const StoreWrap = styled(Stack)`
  width: 100%;
  background-color: white;
`

const StyledStoreInfoBox = styled(Stack)`
  padding: 10px;
  align-items: center;
`
