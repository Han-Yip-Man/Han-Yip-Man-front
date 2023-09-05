import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

export const MenuCard = () => {
  return (
    <Box margin={1} width={'100%'}>
      <Card sx={{ height: 116, display: 'flex', flexDirection: 'column', padding: 1 }}>
        <Box sx={{ height: 110, display: 'flex', flexDirection: 'row' }}>
          <CardMedia component="img" alt="green iguana" height="100" image="/src/assets/domino.jpg" />
          <CardContent sx={{ width: '300%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">씨푸드킹 L</Typography>
            <Typography variant="body1">36,900원</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}
