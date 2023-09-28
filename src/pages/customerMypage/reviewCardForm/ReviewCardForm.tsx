import { Box, Rating } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as S from './ReviewCardForm.style'
import { useAlert, useImageCompression } from '../../../hooks'
import useReview from '../hooks/useReview'

type ReviewCardFormProps = {
  shopId?: number
}

export const ReviewCardForm = ({ shopId }: ReviewCardFormProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, control, setValue } = useForm()
  const toast = useAlert()
  const { mutate } = useReview()

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
        reviewImage: data.reviewImage,
        reviewContent: data.reviewContent,
        reviewScore: data.reviewScore,
        shopId,
      }

      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value)
        }
      })

      mutate(formData)
    } catch (e: any) {
      console.log('리뷰등록실패', e)
      toast(e.message, 3000, 'error')
    }
  }

  return (
    <Box margin={1}>
      <S.CardWrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.RatingStack flexDirection={'row'}>
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
          </S.RatingStack>
          <S.ImageStack flexDirection={'row'}>
            <label htmlFor="image">이미지</label>
            <input type="file" id="img" onChange={handleProfileImageChange} />
            <img width={100} src={reviewImage} alt="리뷰 이미지 미리보기" />
          </S.ImageStack>
          <S.ContentStack flexDirection={'row'}>
            <label htmlFor="content">내용</label>
            <S.StyledTextField
              id="content"
              label="내용"
              multiline
              rows={4}
              variant="filled"
              placeholder="내용을 입력해주세요"
              {...register('reviewContent')}
            />
          </S.ContentStack>
          <input type="submit" value="등록하기" />
        </form>
        {errorMessage ? errorMessage : null}
      </S.CardWrap>
    </Box>
  )
}
