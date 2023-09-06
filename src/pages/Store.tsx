import BasicTabs from '../components/store/BasicTabs'
import { Box, CardMedia, Rating, Stack, Typography } from '@mui/material'

export const Store = () => {
  return (
    <Stack width={'100%'} direction={'column'} marginX={'auto'}>
      <Box>
        <CardMedia component="img" image="/src/assets/pizzahut.png" alt="banner" />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 100,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">피자헛 피자 어느 지점</Typography>
        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography>리뷰 N개</Typography>
      </Box>
      <Box sx={{ width: '100%', height: '100%' }}>
        <BasicTabs />
      </Box>
    </Stack>
  )
}
