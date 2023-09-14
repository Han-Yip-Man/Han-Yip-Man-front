import { Box, Card, Rating, Stack, TextField, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export const ReviewCardForm = () => {
  const { register, handleSubmit, watch, control } = useForm()
  const [imgPreview, setImgPreview] = useState('')
  const image = watch('img')

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0]
      setImgPreview(URL.createObjectURL(file))
    }
  }, [image])

  return (
    <Box margin={1}>
      <CardWrap>
        {/**
         *
         * TODO: 별점, 사진, 내용 적어서 보냄 + 가게아이디
         *
         *
         * */}
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Stack flexDirection={'row'}>
            <label htmlFor="rating">별점</label>
            <Controller
              name="rating"
              control={control}
              defaultValue={5}
              rules={{ required: true }}
              render={(props: any) => <Rating name="rating" onChange={props.onChange} />}
            />
          </Stack>
          <Stack flexDirection={'row'}>
            <label htmlFor="image">이미지</label>
            <input type="file" id="img" {...register('img')} />
            <img width={100} src={imgPreview} />
          </Stack>
          <Stack flexDirection={'row'}>
            <label htmlFor="content">내용</label>
            <TextField
              id="content"
              label="내용"
              multiline
              rows={4}
              variant="filled"
              placeholder="내용을 입력해주세요"
              {...register('content')}
            />
          </Stack>
          <input type="submit" value="등록하기" />
        </form>
      </CardWrap>
    </Box>
  )
}

const CardWrap = styled(Card)`
  height: 210;
  display: 'flex';
  flex-direction: 'column';
  padding: 8px;
`
