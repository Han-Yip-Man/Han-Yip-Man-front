import BasicTabs from '../components/store/BasicTabs'
import { Box, CardMedia, Rating, Stack, Typography } from '@mui/material'

export const Store = () => {
  return (
    <Stack direction={'column'}>
      <Box sx={{ backgroundColor: 'pink', width: 600, height: 0 }}>
        <CardMedia component="img" image="/src/assets/domino.jpg" alt="banner" />
      </Box>
      <Box sx={{ backgroundColor: 'purple', width: 600, height: 100, marginTop: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4">도미노 피자 어느 점</Typography>
        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
      </Box>
      <Box sx={{ backgroundColor: 'pink', width: 600, height: 500 }}>
        <BasicTabs />
      </Box>
    </Stack>
  )
}
