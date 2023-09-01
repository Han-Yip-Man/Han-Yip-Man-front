import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'

export const MenuCard = () => {
  return (
    <Box margin={1}>
      <Card sx={{ maxWidth: 700, height: 110, display: 'flex', flexDirection: 'column', padding: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}></Box>
        <Box sx={{ maxWidth: 700, width: 100, height: 110, display: 'flex', flexDirection: 'row' }}>
          <CardMedia component="img" alt="green iguana" width="50" height="100" image="/src/assets/domino.jpg" />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="h6">Lizard</Typography>
                <Typography variant="body1">asldkfjlasdkfjlasdkfjlasdjkf</Typography>
              </Box>
              <Typography>Lizard</Typography>
              <Typography>Lizard</Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}
