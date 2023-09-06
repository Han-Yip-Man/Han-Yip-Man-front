import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../common/InputField'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import useImageCompression from '../../hooks/useImageCompression'
import { FormData } from '../../types/user'

interface AddRestaurantsProps {
  setMenupage: (value: number) => void
}

const AddRestaurants: React.FC<AddRestaurantsProps> = ({ setMenupage }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors = {} },
  } = useForm()

  const onSubmit = (data: FormData) => {
    console.log('데이따!', data)
  }

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await compressMainImage(file)
    }
  }

  const handleBannerImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await compressBannerImage(file)
    }
  }

  const {
    image: mainImage,
    compressImage: compressMainImage,
    compressedFile: mainCompressedFile,
  } = useImageCompression('/img/preview.jpg')
  const {
    image: bannerImage,
    compressImage: compressBannerImage,
    compressedFile: bannerCompressedFile,
  } = useImageCompression('/img/preview.jpg')

  useEffect(() => {
    if (mainCompressedFile) {
      setValue('mainImage', mainCompressedFile)
    }
    if (bannerCompressedFile) {
      setValue('bannerImage', bannerCompressedFile)
    }
  }, [mainCompressedFile, bannerCompressedFile, setValue])

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <BackBtn src="img/back.svg" alt="" onClick={() => setMenupage(1)} />
        <FormFrame>
          <Addtitle>
            <h1>신규 가게 등록</h1>
          </Addtitle>

          <ImageUploadContainer>
            <PreviewContainer>
              <PreviewBox>
                <input type="file" id="mainImage" onChange={handleMainImageChange} />
                <img src={mainImage} alt="대표 이미지 미리보기" />
              </PreviewBox>
              <ImageDescription>대표 이미지</ImageDescription>
            </PreviewContainer>

            <PreviewContainer>
              <PreviewBox>
                <input type="file" id="bannerImage" onChange={handleBannerImageChange} />
                <img src={bannerImage} alt="배너 이미지 미리보기" />
              </PreviewBox>
              <ImageDescription>배너 이미지</ImageDescription>
            </PreviewContainer>
          </ImageUploadContainer>

          <InputField
            label="상호명"
            {...register('storeName', {
              required: true,
              minLength: 2,
              pattern: /^[A-Za-z가-힣\s]+$/,
            })}
            errorMessage={
              (errors.storeName?.type === 'pattern' &&
                '상호명은 한글 혹은 영어만 입력 가능합니다.') ||
              (errors.storeName?.type === 'required' && '상호명은 필수 입력입니다.')
            }
          />

          <InputField
            label="전화번호"
            placeholder="지역번호를 포함하여 입력해주세요 예시)02-123-1234"
            {...register('storePhone', { required: true, pattern: /^\d{2,3}-\d{3,4}-\d{4}$/ })}
            errorMessage={errors.storePhone && '정확한 전화번호를 입력해주세요.'}
          />

          <InputField
            label="카테고리"
            {...register('category', { required: true })}
            errorMessage={errors.category && '카테고리를 입력해주세요.'}
          />

          <InputField
            label="주소"
            {...register('address', { required: true, minLength: 5 })}
            errorMessage={errors.address && '주소를 입력해주세요.'}
          />

          <InputField
            label="사업자등록번호"
            maxLength={10}
            {...register('businessNumber', { required: true, pattern: /^\d{10}$/ })}
            errorMessage={errors.businessNumber && '정확한 사업자 등록번호를 입력해주세요.'}
          />

          <InputField
            label="최소주문금액"
            {...register('minimumOrderAmount', {
              required: true,
              pattern: /^[0-9]+$/,
            })}
            errorMessage={errors.minimumOrderAmount && '최소 주문금액은 숫자만 입력해주세요.'}
          />

          <SubmitButton className="submit_btn" variant="contained" type="submit">
            가게 등록
          </SubmitButton>
        </FormFrame>
      </Form>
    </Wrapper>
  )
}

export default AddRestaurants

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  justify-content: center;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`

const FormFrame = styled.div`
  width: 50%;
`

const BackBtn = styled.img`
  position: absolute;
  left: 30px;
  top: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const Addtitle = styled.div`
  text-align: center;
  margin: 20px 0;
  h1 {
    font-size: 25px;
    font-weight: 500;
  }
`

const ImageUploadContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-bottom: 30px;
`

const PreviewBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 95%;
    height: 95%;
    object-fit: cover;
    cursor: pointer;
  }

  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageDescription = styled.span`
  font-size: 14px;
`

const SubmitButton = styled(Button)`
  width: 100%;
  font-size: 20px;
  margin-bottom: 40px;
`
