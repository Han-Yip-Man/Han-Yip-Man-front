import { Box, Card, Input, Rating, Stack, TextField, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { postReview } from '../../api/mypage'
import useImageCompression from '../../pages/common/hooks/useImageCompression'
import { useAlert } from '../../hooks'
import { useMutation } from '@tanstack/react-query'

type ReviewCardFormProps = {
  shopId?: number
}

export const ReviewCardForm = ({ shopId }: ReviewCardFormProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, control, setValue } = useForm()
  const toast = useAlert()
  const addReview = useMutation(postReview, {
    onSuccess: (res) => {
      toast(res.message, 3000, 'info')
    },
    onError: (error) => console.log(error),
  })

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

      addReview.mutate(formData)
    } catch (e: any) {
      console.log('리뷰등록실패', e)
      toast(e.message, 3000, 'error')
    }
  }

  return (
    <Box margin={1}>
      <CardWrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RatingStack flexDirection={'row'}>
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
          </RatingStack>
          <ImageStack flexDirection={'row'}>
            <label htmlFor="image">이미지</label>
            <input type="file" id="img" onChange={handleProfileImageChange} />
            <img width={100} src={reviewImage} alt="리뷰 이미지 미리보기" />
          </ImageStack>
          <ContentStack flexDirection={'row'}>
            <label htmlFor="content">내용</label>
            <StyledTextField
              id="content"
              label="내용"
              multiline
              rows={4}
              variant="filled"
              placeholder="내용을 입력해주세요"
              {...register('reviewContent')}
            />
          </ContentStack>
          <input type="submit" value="등록하기" />
        </form>
        {errorMessage ? errorMessage : null}
      </CardWrap>
    </Box>
  )
}

const CardWrap = styled(Card)`
  display: 'flex';
  flex-direction: 'column';
  padding: 16px;
  border-radius: 20px;
  background: linear-gradient(332deg, #f69f86, #f69f86 30%, #fcd797);
  input[type='file'] {
    border: none;
  }
  input[type='submit'] {
    width: 200px;
    height: 50px;
    margin: 30px 0 0 150px;
    border: none;
    border-radius: 20px;
    font: inherit;
    font-size: 1.25rem;
  }
`

const RatingStack = styled(Stack)`
  width: 500px;
  > label {
    margin-right: 50px;
  }
`

const ImageStack = styled(Stack)`
  width: 500px;
  align-items: center;
  > label {
    margin-right: 50px;
  }
  > img {
    margin: 8px;
    padding: 8px;
    border: 1px solid #fbcf94;
    border-radius: 8px;
  }
`

const ContentStack = styled(Stack)`
  width: 500px;
  > label {
    margin-right: 50px;
  }
`

const StyledTextField = styled(TextField)`
  width: 80%;
`
