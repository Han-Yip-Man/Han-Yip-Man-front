import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const ReviewCard = () => {
  return (
    <Box margin={1}>
      <Card sx={{ maxWidth: 700, height: 210, display: 'flex', flexDirection: 'column', padding: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="h5" component="div">
            ID
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Rating
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Few Days Ago
          </Typography>
          <Box sx={{ width: 250 }} />
        </Box>
        <Box sx={{ maxWidth: 700, height: 150, display: 'flex', flexDirection: 'row' }}>
          <CardMedia component="img" alt="green iguana" height="150" image="/src/assets/domino.jpg" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}
