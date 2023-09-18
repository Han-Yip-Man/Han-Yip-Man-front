import { Box, Card, Rating, Stack, TextField, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { postReview } from '../../api/mypage'
import useImageCompression from '../../hooks/useImageCompression'

type ReviewRequest = {
  reviewContent?: string
  reviewImage?: File
  reviewScore?: number
  shopId?: string
  [key: string]: any
}

export const ReviewCardForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, watch, control, setValue } = useForm() //<ReviewRequest>

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await compressProfileImage(file)
    }
  }

  const {
    image: reviewImage,
    compressImage: compressProfileImage,
    compressedFile: profileCompressedFile,
  } = useImageCompression('/img/preview.jpg')

  useEffect(() => {
    if (profileCompressedFile) {
      setValue('reviewImage', profileCompressedFile)
    }
  }, [profileCompressedFile])

  const onSubmit = async (data: any) => {
    try {
      setErrorMessage('')
      const payload = {
        reviewImag: data.reviewImage,
        reviewContent: data.reviewContent,
        reviewScore: data.reviewScore,
        shopId: 11410, // order
      }

      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value)
        }
      })

      const response = await postReview(formData)
      console.log('리뷰등록성공', response)
    } catch (e: any) {
      console.log('리뷰등록실패', e)
      setErrorMessage(e.response.data.message)
    }
  }

  return (
    <Box margin={1}>
      <CardWrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection={'row'}>
            <label htmlFor="rating">별점</label>
            <Controller
              name="reviewScore"
              control={control}
              defaultValue={5}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Rating
                    {...field}
                    onChange={(e) => field.onChange(parseInt((e.target as HTMLInputElement).value))}
                  />
                )
              }}
            />
          </Stack>
          <Stack flexDirection={'row'}>
            <label htmlFor="image">이미지</label>
            <input type="file" id="img" onChange={handleProfileImageChange} />
            <img width={100} src={reviewImage} alt="리뷰 이미지 미리보기" />
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
              {...register('reviewContent')}
            />
          </Stack>
          <input type="submit" value="등록하기" />
        </form>
        {errorMessage ? errorMessage : null}
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
