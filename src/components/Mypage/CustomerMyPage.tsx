import { Avatar, Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import { ReviewCard } from '../store/ReviewCard'

export const CustomerMyPage = () => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} m={'auto'}>
      <Box bgcolor={'secondary.main'}>
        CustomerMyPage
        <Stack p={10} spacing={2} flexDirection={'row'}>
          <Stack p={4} width={200} flexDirection={'column'} alignItems={'center'} bgcolor={'white'}>
            <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}></Avatar>
            <Typography m={2} variant="body1" display={'inline-block'} bgcolor={'primary.light'}>
              ninkname
            </Typography>
          </Stack>
          <Stack m={0} bgcolor={'white'}>
            <Typography>Id : id</Typography>
            <Typography>Phone : phone</Typography>
            <Typography>Address : address</Typography>
            <Typography>Detail Address : detail address</Typography>
          </Stack>
        </Stack>
        <Box p={10}>
          review
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <Card>
            <CardHeader>asdf</CardHeader>
            <CardContent>
              sdfg asdf qwer
              <Typography>Id : id</Typography>
              <Typography>Phone : phone</Typography>
              <Typography>Address : address</Typography>
              <Typography></Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Stack>
  )
}
