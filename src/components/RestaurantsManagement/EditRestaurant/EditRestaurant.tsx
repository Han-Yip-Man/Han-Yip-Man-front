import { useGetshopDeatil } from '../../../hooks/useGetshopDeatil'
import * as S from './EditRestaurant.style'
import { useState, useRef, useEffect, ChangeEvent } from 'react'
import { getShopDetail } from '../../../api/restaurant'
import { useSetRecoilState } from 'recoil'
import { shopDetailState, sellerDashboardNum } from '../../../recoil/restaurants'
import { EditGridSection } from './EditPatchInfo'
import { sections, categories } from './EditRestaurantInfo'
import { Select, MenuItem, Grid } from '@mui/material'
import useShopinfoPatch from '../../../hooks/useShopinfoPatch'
import useAlert from '../../../hooks/useAlert'
import { FieldNames, ShopInfo } from '../../../types/restaurantsAtom'
import { patchShopbanner, patchShopthumbnail } from '../../../api/restaurant'
import useImageCompression from '../../../hooks/useImageCompression'
import { validateField } from './EditPatchRegex'

const EditRestaurant = () => {
  const { shop, currentId } = useGetshopDeatil()
  const [tempData, setTempData] = useState<ShopInfo>({})
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({})
  const setdetail = useSetRecoilState(shopDetailState)
  const setpage = useSetRecoilState(sellerDashboardNum)
  const { save } = useShopinfoPatch()
  const toast = useAlert()
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const { compressImage, compressedFile, setCompressedFile } = useImageCompression()
  const [imageType, setImageType] = useState<'thumbnail' | 'banner' | null>(null)

  const handleEdit = (field: FieldNames) => {
    setEditMode((prev) => ({ ...prev, [field]: true }))

    if (field === 'categoryName') {
      const currentCategoryIndex = categories.findIndex(
        (category) => category === shop.categoryName,
      )
      setTempData((prev) => ({
        ...prev,
        categoryName: currentCategoryIndex !== -1 ? currentCategoryIndex : undefined,
      }))
    } else {
      setTempData((prev) => ({ ...prev, [field]: shop[field] }))
    }
  }

  const handleCancel = (field: FieldNames) => {
    setEditMode((prev) => ({ ...prev, [field]: false }))
    setTempData((prev) => ({ ...prev, [field]: shop[field] }))
  }

  const handleSave = (field: FieldNames) => {
    const value = tempData[field] as string | number

    if (!validateField(field, value)) {
      toast('잘못된 입력 값입니다.', 2000, 'error')
      return
    }

    if (currentId !== null) {
      save(field, currentId, value as string | number)
        .then(() => {
          toast('성공적으로 수정되었습니다.', 2000, 'success')
          setEditMode((prev) => ({ ...prev, [field]: false }))
          return getShopDetail(currentId)
        })
        .then((response) => {
          setdetail(response)
        })
        .catch((error) => {
          toast(error.response.data.message, 2000, 'error')
        })
    }
  }

  const handleChange = (field: FieldNames, value: string | number) => {
    setTempData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    type: 'thumbnail' | 'banner',
  ) => {
    if (event.target.files) {
      const file = event.target.files[0]
      if (file) {
        try {
          await compressImage(file)
          setImageType(type)
        } catch (error) {
          console.error('이미지 압축 실패', error)
        }
      }
    }
  }

  useEffect(() => {
    if (compressedFile && imageType && currentId !== null) {
      const handleAPIRequest = async () => {
        const formData = new FormData()
        if (imageType === 'thumbnail') {
          formData.append('thumbnailImage', compressedFile)
        } else if (imageType === 'banner') {
          formData.append('bannerImage', compressedFile)
        }

        const apiMethod = imageType === 'thumbnail' ? patchShopthumbnail : patchShopbanner

        apiMethod(currentId, formData)
          .then(() => {
            setCompressedFile(null)
            toast('이미지 수정에 성공했습니다', 2000, 'success')
            getShopDetail(currentId).then((response) => {
              setdetail(response)
            })
          })
          .catch((error) => {
            console.log(error)
            toast('이미지 수정에 실패하였습니다', 2000, 'error')
          })
      }

      handleAPIRequest()
    }
  }, [compressedFile])

  console.log(compressedFile)

  function handleImageDelete(type: 'thumbnail' | 'banner') {
    const apiMethod = type === 'thumbnail' ? patchShopthumbnail : patchShopbanner

    if (currentId !== null) {
      const formData = new FormData()
      apiMethod(currentId, formData)
        .then((response) => {
          toast('이미지가 삭제되었습니다.', 2000, 'success')
          getShopDetail(currentId).then((response) => {
            setdetail(response)
          })
        })
        .catch((error) => {
          console.error('이미지 삭제 실패', error)
        })
    }
  }

  return (
    <S.Wrapper>
      <S.GridContainer>
        <Grid container spacing={3}>
          <Grid container item xs={12} style={{ height: '20%' }}>
            <S.InfoGrid item xs={2.5}>
              <div>대표이미지 :</div>
            </S.InfoGrid>
            <S.ImageGrid item xs={6.5}>
              <S.ImagePreview>
                <img src={shop.thumbnailUrl} alt="" />
              </S.ImagePreview>
            </S.ImageGrid>
            <S.ActionGrid item xs={3}>
              <S.ActionButton
                variant="contained"
                onClick={() => thumbnailInputRef.current?.click()}
              >
                수정
              </S.ActionButton>
              <input
                type="file"
                ref={thumbnailInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e, 'thumbnail')}
              />
              <S.ActionButton
                color="error"
                variant="contained"
                onClick={() => handleImageDelete('thumbnail')}
              >
                삭제
              </S.ActionButton>
            </S.ActionGrid>
          </Grid>
          <Grid container item xs={12} style={{ height: '20%' }}>
            <S.InfoGrid item xs={2.5}>
              <div>배너이미지 :</div>
            </S.InfoGrid>
            <S.ImageGrid item xs={6.5}>
              <S.ImagePreview>
                <img src={shop.bannerUrl} alt="" />
              </S.ImagePreview>
            </S.ImageGrid>
            <S.ActionGrid item xs={3}>
              <S.ActionButton variant="contained" onClick={() => bannerInputRef.current?.click()}>
                수정
              </S.ActionButton>
              <input
                type="file"
                ref={bannerInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e, 'banner')}
              />
              <S.ActionButton
                color="error"
                variant="contained"
                onClick={() => handleImageDelete('banner')}
              >
                삭제
              </S.ActionButton>
            </S.ActionGrid>
          </Grid>
          {sections.map((section) => (
            <EditGridSection
              key={section.field}
              label={section.label}
              field={section.field}
              editMode={editMode}
              handleEdit={handleEdit}
              handleCancel={handleCancel}
              handleSave={handleSave}
              handleChange={handleChange}
              tempData={tempData}
              shop={shop}
            />
          ))}
          <Grid container item xs={12} style={{ height: '10%' }}>
            <S.InfoGrid item xs={2.5}>
              <div>카테고리 :</div>
            </S.InfoGrid>
            <S.ValueGrid item xs={6.5}>
              {editMode.categoryName ? (
                <Select
                  value={
                    tempData.categoryName !== undefined
                      ? tempData.categoryName
                      : categories.indexOf(shop.categoryName)
                  }
                  onChange={(e) => handleChange('categoryName', e.target.value)}
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={index}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                shop.categoryName
              )}
            </S.ValueGrid>
            <S.ActionGrid item xs={3}>
              {editMode.categoryName ? (
                <>
                  <S.ActionButton variant="contained" onClick={() => handleSave('categoryName')}>
                    저장
                  </S.ActionButton>
                  <S.ActionButton variant="contained" onClick={() => handleCancel('categoryName')}>
                    취소
                  </S.ActionButton>
                </>
              ) : (
                <S.ActionButton variant="contained" onClick={() => handleEdit('categoryName')}>
                  수정
                </S.ActionButton>
              )}
            </S.ActionGrid>
          </Grid>
        </Grid>
      </S.GridContainer>

      <S.BackButton src="/img/back.svg" alt="" onClick={() => setpage(1)} />
    </S.Wrapper>
  )
}

export default EditRestaurant
