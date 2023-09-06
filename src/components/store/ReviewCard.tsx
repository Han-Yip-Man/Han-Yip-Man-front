import { Box, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material'

export const ReviewCard = () => {
  return (
    <Box margin={1}>
      <Card sx={{ height: 210, display: 'flex', flexDirection: 'column', padding: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="h5" component="div">
            ID
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <Rating name="half-rating-read" defaultValue={5} precision={5} readOnly />
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Few Days Ago
          </Typography>
          <Box width={'50%'}></Box>
        </Box>
        <Box sx={{ height: 150, display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="150"
            image="/src/assets/pizzahut.png"
          />
          <CardContent sx={{ width: '200%' }}>
            <Typography gutterBottom variant="h5" component="div">
              너무 맛있어요
            </Typography>
            <Typography variant="body2" color="text.secondary">
              사장님이 친절하고 피자가 맛있어오 정말 쵝오의 피자
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}
