import * as S from './MenuEditModal.style'
import Modal from '@mui/material/Modal'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  shopMenuEditModal,
  selectedShopMenuEdit,
  currentGroupName,
  shopMenuGroups,
  shopGroupid,
  shopMenu,
  LoadingModal,
} from '../../../atoms/restaurantsAtoms'
import { Grid, Button, Select, MenuItem } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import InputField from '../../../pages/app/common/InputField'
import useEditPatch from '../../../hooks/useEditPatch'
import { useAlert } from '../../../hooks'
import { getsellerMenu } from '../../../api/restaurant'
import { patchMenuthumbnailEdit } from '../../../api/shopMenuEdit.api'
import useImageCompression from '../../../hooks/useImageCompression'
import { MenuField } from '../../../types/restaurantsAtom'
import ImegeModalLoading from '../../../pages/app/common/ImageModalLoading'
import { menuplaceholders } from './MenuEditInfo'
import { menuvalidateField } from './MenuEditRegex'
import { MenuType } from '../../../types/sellermenu'

const MenuEditModal = () => {
  const [open, setOpen] = useRecoilState(shopMenuEditModal)
  const Menu: MenuType | null = useRecoilValue(selectedShopMenuEdit)
  const groupid = useRecoilValue(shopGroupid)
  const groupName = useRecoilValue(currentGroupName)
  const menuGroups = useRecoilValue(shopMenuGroups)
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({})
  const [tempData, setTempData] = useState({
    categorygroups: groupid,
    menuName: Menu?.menuName,
    menuDescription: Menu?.menuDescription,
    menuPrice: Menu?.menuPrice,
  })
  const { save } = useEditPatch()
  const toast = useAlert()
  const setMenu = useSetRecoilState(shopMenu)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { compressImage, compressedFile, setCompressedFile } = useImageCompression()
  const setLoading = useSetRecoilState(LoadingModal)
  const MenuImg = Menu?.menuThumbnailUrl ? Menu?.menuThumbnailUrl : '/img/fooddefault.jpg'

  const handleChange = (field: MenuField, value: string | number | null) => {
    setTempData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEdit = (field: MenuField) => {
    setEditMode((prev) => ({ ...prev, [field]: true }))
  }
  const handleCancel = (field: MenuField) => {
    if (Menu !== null) {
      setEditMode((prev) => ({ ...prev, [field]: false }))
      setTempData((prev) => ({ ...prev, [field]: Menu[field] }))
    }
  }

  useEffect(() => {
    if (groupid) {
      setTempData((prev) => ({ ...prev, categorygroups: groupid }))
    }
  }, [groupid])

  const handleSave = (field: MenuField) => {
    const value = tempData[field] as string | number

    if (!menuvalidateField(field, value)) {
      toast('잘못된 입력 값입니다.', 2000, 'error')
      return
    }
    if (Menu !== null) {
      save(field, Menu.menuId, value as string | number)
        .then(() => {
          toast('성공적으로 수정되었습니다.', 2000, 'success')
          setEditMode((prev) => ({ ...prev, [field]: false }))
          return getsellerMenu(groupid)
        })
        .then((response) => {
          setMenu(response)
        })
        .catch((error) => {
          toast(error.response.data.message, 2000, 'error')
        })
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setTempData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file) {
        compressImage(file)
        setLoading(true)
      }
    }
  }

  useEffect(() => {
    if (compressedFile) {
      const formData = new FormData()
      formData.append('bannerImage', compressedFile)

      if (Menu !== null) {
        patchMenuthumbnailEdit(Menu?.menuId, formData)
          .then(() => {
            setCompressedFile(null)
            setLoading(false)
            toast('이미지 수정에 성공하였습니다.', 2000, 'success')
            getsellerMenu(groupid).then((response) => {
              setMenu(response)
            })
          })
          .catch((error) => {
            toast('이미지 수정에 실패했습니다.', 2000, 'error')
          })
      }
    }
  }, [compressedFile])

  const handleImageDelete = () => {
    const formData = new FormData()

    if (Menu !== null) {
      patchMenuthumbnailEdit(Menu?.menuId, formData)
        .then((response) => {
          toast('이미지가 삭제되었습니다.', 2000, 'success')
          getsellerMenu(groupid).then((response) => {
            setMenu(response)
          })
        })
        .catch((error) => {
          toast('이미지 삭제에 실패했습니다.', 2000, 'error')
        })
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <S.StyledBox>
          <S.GridContainer container>
            <Grid container item xs={12} style={{ height: '28%' }}>
              <S.InfoGrid item xs={4}>
                <p>현재 이미지 :</p>
              </S.InfoGrid>
              <S.ValueGrid item xs={4}>
                <img src={MenuImg} alt="메뉴 이미지" style={{ width: '100px', height: '100px' }} />
              </S.ValueGrid>
              <S.ActionGrid item xs={4}>
                <Button variant="contained" onClick={() => fileInputRef.current?.click()}>
                  수정
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <Button color="error" variant="contained" onClick={handleImageDelete}>
                  삭제
                </Button>
              </S.ActionGrid>
            </Grid>

            <Grid container item xs={12} style={{ height: '18%' }}>
              <S.InfoGrid item xs={4}>
                <p>현재카테고리 :</p>
              </S.InfoGrid>
              <S.ValueGrid item xs={4}>
                {editMode.categorygroups ? (
                  <Select
                    value={tempData.categorygroups}
                    onChange={(e) => handleChange('categorygroups', e.target.value)}
                  >
                    {menuGroups.map((item) => (
                      <MenuItem key={item.menuGroupId} value={item.menuGroupId}>
                        {item.menuGroupName}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <p>{groupName}</p>
                )}
              </S.ValueGrid>
              <S.ActionGrid item xs={4}>
                {editMode.categorygroups ? (
                  <>
                    <Button variant="contained" onClick={() => handleSave('categorygroups')}>
                      저장
                    </Button>
                    <Button variant="contained" onClick={() => handleCancel('categorygroups')}>
                      취소
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={() => handleEdit('categorygroups')}>
                    수정
                  </Button>
                )}
              </S.ActionGrid>
            </Grid>
            <Grid container item xs={12} style={{ height: '18%' }}>
              <S.InfoGrid item xs={4}>
                <p>메뉴 이름 :</p>
              </S.InfoGrid>
              <S.ValueGrid item xs={4}>
                {editMode.menuName ? (
                  <InputField
                    label="메뉴이름"
                    value={tempData.menuName ?? Menu?.menuName}
                    onChange={handleInputChange}
                    name="menuName"
                    maxLength={15}
                    placeholder={menuplaceholders.menuName}
                  />
                ) : (
                  <p>{Menu?.menuName}</p>
                )}
              </S.ValueGrid>
              <S.ActionGrid item xs={4}>
                {editMode.menuName ? (
                  <>
                    <Button variant="contained" onClick={() => handleSave('menuName')}>
                      저장
                    </Button>
                    <Button variant="contained" onClick={() => handleCancel('menuName')}>
                      취소
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={() => handleEdit('menuName')}>
                    수정
                  </Button>
                )}
              </S.ActionGrid>
            </Grid>
            <Grid container item xs={12} style={{ height: '18%' }}>
              <S.InfoGrid item xs={4}>
                <p>메뉴 설명 :</p>
              </S.InfoGrid>
              <S.ValueGrid item xs={4}>
                {editMode.menuDescription ? (
                  <InputField
                    label="메뉴설명"
                    value={tempData.menuDescription ?? Menu?.menuDescription}
                    onChange={handleInputChange}
                    name="menuDescription"
                    maxLength={30}
                    placeholder={menuplaceholders.menuDescription}
                  />
                ) : (
                  <p>{Menu?.menuDescription}</p>
                )}
              </S.ValueGrid>
              <S.ActionGrid item xs={4}>
                {editMode.menuDescription ? (
                  <>
                    <Button variant="contained" onClick={() => handleSave('menuDescription')}>
                      저장
                    </Button>
                    <Button variant="contained" onClick={() => handleCancel('menuDescription')}>
                      취소
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={() => handleEdit('menuDescription')}>
                    수정
                  </Button>
                )}
              </S.ActionGrid>
            </Grid>
            <Grid container item xs={12} style={{ height: '18%' }}>
              <S.InfoGrid item xs={4}>
                <p>메뉴 가격 :</p>
              </S.InfoGrid>
              <S.ValueGrid item xs={4}>
                {editMode.menuPrice ? (
                  <InputField
                    label="메뉴가격"
                    value={tempData.menuPrice ?? Menu?.menuPrice}
                    onChange={handleInputChange}
                    name="menuPrice"
                    maxLength={12}
                    placeholder={menuplaceholders.menuPrice}
                  />
                ) : (
                  <p>{Menu?.menuPrice}</p>
                )}
              </S.ValueGrid>
              <S.ActionGrid item xs={4}>
                {editMode.menuPrice ? (
                  <>
                    <Button variant="contained" onClick={() => handleSave('menuPrice')}>
                      저장
                    </Button>
                    <Button variant="contained" onClick={() => handleCancel('menuPrice')}>
                      취소
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={() => handleEdit('menuPrice')}>
                    수정
                  </Button>
                )}
              </S.ActionGrid>
            </Grid>
          </S.GridContainer>
        </S.StyledBox>
      </Modal>
      <ImegeModalLoading />
    </>
  )
}

export default MenuEditModal
