import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../common/InputField'
import * as S from './AddRestaurants.style'
import useImageCompression from '../../../hooks/useImageCompression'
import { FormDataType } from '../../../types/user'
import { addShop } from '../../../api/restaurant'
import { SelectChangeEvent } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { CategoryData } from '../../../assets/data/restaurantdata.js'
import useAddressSearch from '../../../hooks/useAddressSearch.js'
import { DaumPostcodeData } from '../../../types/Address.js'
import useAlert from '../../../hooks/useAlert.js'

interface AddRestaurantsProps {
  setMenupage: (value: number) => void
}

const AddRestaurants: React.FC<AddRestaurantsProps> = ({ setMenupage }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors = {}, isSubmitted },
  } = useForm()
  const toast = useAlert()

  const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  const openPostcodePopup = useAddressSearch(scriptUrl)
  const [catavalue, setCatevalue] = useState('카테고리 선택하기')

  const [address, setAddress] = useState<DaumPostcodeData | null>({
    address: '',
    zonecode: '',
    coordinates: null,
  })

  console.log(address)

  const handleAddressPopup = () => {
    openPostcodePopup()
      .then((result) => {
        if (result) {
          setAddress((prevState) => ({
            ...prevState,
            address: result.address,
            zonecode: result.zonecode,
            coordinates: result.coordinates,
          }))
        }
      })
      .catch((err: Error) => {
        console.error(err)
      })
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

  const onSubmit = async (data: FormDataType) => {
    try {
      const payload = {
        address: data.address,
        addressDetail: data.detailaddress,
        bannerImage: data.bannerImage,
        businessNumber: data.businessNumber,
        categoryId: catavalue,
        latitude: Number(parseFloat(address?.coordinates?.latitude || '0').toFixed(6)),
        longitude: Number(parseFloat(address?.coordinates?.longitude || '0').toFixed(6)),
        minOrderPrice: data.minimumOrderAmount,
        shopName: data.storeName,
        shopPhone: data.storePhone,
        showDescription: data.storedesc,
        thumbnailImage: data.mainImage,
      }

      const formData = new FormData()

      console.log('어흥', formData, payload)

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString())
        }
      })

      await addShop(formData)
      toast('가게가 성공적으로 등록되었습니다', 2000, 'success')
      setTimeout(() => {
        setMenupage(1)
      }, 2000)
    } catch (error) {
      toast('가게등록에 실패하였습니다.', 3000, 'error')
    }
  }

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setCatevalue(event.target.value as string)
  }

  return (
    <S.Wrapper>
      <S.Form>
        <S.BackBtn src="/img/back.svg" alt="" onClick={() => setMenupage(1)} />
        <S.FormFrame>
          <S.Addtitle>
            <h1>신규 가게 등록</h1>
          </S.Addtitle>

          <S.ImageUploadContainer>
            <S.PreviewContainer>
              <S.PreviewBox>
                <input type="file" id="mainImage" onChange={handleMainImageChange} />
                <img src={mainImage} alt="대표 이미지 미리보기" />
              </S.PreviewBox>
              <S.ImageDescription>대표 이미지</S.ImageDescription>
            </S.PreviewContainer>

            <S.PreviewContainer>
              <S.PreviewBox>
                <input type="file" id="bannerImage" onChange={handleBannerImageChange} />
                <img src={bannerImage} alt="배너 이미지 미리보기" />
              </S.PreviewBox>
              <S.ImageDescription>배너 이미지</S.ImageDescription>
            </S.PreviewContainer>
          </S.ImageUploadContainer>

          <InputField
            label="상호명"
            {...register('storeName', {
              required: true,
              minLength: 2,
              maxLength: 20,
              pattern: /^[A-Za-z가-힣\s]+$/,
            })}
            errorMessage={
              (errors.storeName?.type === 'pattern' &&
                '상호명은 한글 혹은 영어만 입력 가능합니다.') ||
              (errors.storeName?.type === 'required' && '상호명은 필수 입력입니다.')
            }
          />

          <InputField
            label="가게 소개"
            {...register('storedesc', {
              required: true,
              minLength: 2,
              maxLength: 100,
              pattern: /^[A-Za-z가-힣\s]+$/,
            })}
            errorMessage={
              (errors.storeName?.type === 'pattern' &&
                '상호명은 한글 혹은 영어만 입력 가능합니다.') ||
              (errors.storeName?.type === 'required' && '가게 소개는 필수 입력입니다.')
            }
          />

          <InputField
            label="전화번호"
            placeholder="지역번호를 포함하여 입력해주세요 예시)02-123-1234"
            {...register('storePhone', { required: true, pattern: /^\d{2,3}-\d{3,4}-\d{4}$/ })}
            errorMessage={errors.storePhone && '정확한 전화번호를 입력해주세요.'}
          />

          <S.StyleSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={catavalue}
            onChange={handleChange}
          >
            <MenuItem value="카테고리 선택하기" disabled>
              카테고리 선택하기
            </MenuItem>
            {CategoryData.map((item) => (
              <MenuItem key={item.Id} value={item.Id}>
                {item.name}
              </MenuItem>
            ))}
          </S.StyleSelect>

          <S.AddressBtnbox>
            <InputField
              label="우편번호"
              type="text"
              value={address ? address.zonecode : ''}
              {...register('zonecode', { required: true })}
            />
            <S.AddressBtn variant="contained" onClick={handleAddressPopup}>
              주소 입력하기
            </S.AddressBtn>
          </S.AddressBtnbox>

          <InputField
            label="주소"
            type="text"
            value={address ? address.address : ''}
            {...register('address', { required: true })}
            errorMessage={isSubmitted && errors.address && '주소를 입력해 주세요.'}
          />

          <InputField
            label="상세주소"
            type="text"
            maxLength={25}
            {...register('detailaddress', {
              required: true,
              minLength: 2,
              maxLength: 30,
              pattern: /^[가-힣0-9\s]+$/,
            })}
            errorMessage={
              isSubmitted &&
              errors.detailaddress &&
              (errors.detailaddress.type === 'pattern'
                ? '상세주소는 한글과 숫자만 입력 가능합니다.'
                : '상세주소를 입력해 주세요.')
            }
          />

          <InputField
            label="사업자등록번호"
            placeholder="- 없이 숫자로만 입력해주세요."
            maxLength={10}
            {...register('businessNumber', { required: true, pattern: /^\d{10}$/ })}
            errorMessage={errors.businessNumber && '정확한 사업자 등록번호를 입력해주세요.'}
          />

          <InputField
            label="최소주문금액"
            placeholder="숫자만 입력 가능합니다."
            {...register('minimumOrderAmount', {
              required: true,
              minLength: 1,
              maxLength: 10,
              pattern: /^[0-9]+$/,
            })}
            errorMessage={errors.minimumOrderAmount && '최소 주문금액은 숫자만 입력해주세요.'}
          />

          <S.SubmitButton
            className="submit_btn"
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            가게 등록
          </S.SubmitButton>
        </S.FormFrame>
      </S.Form>
    </S.Wrapper>
  )
}

export default AddRestaurants
