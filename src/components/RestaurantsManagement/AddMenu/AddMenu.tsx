import React, { useState } from 'react'
import * as S from './AddMenu.style'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputField from '../../common/InputField'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import useAlert from '../../../hooks/useAlert'
import useImageCompression from '../../../hooks/useImageCompression'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { shopGroupid, shopmenupage, LoadingModal } from '../../../recoil/restaurants'
import { addsellerMenu } from '../../../api/restaurant'
import ImageModalLoading from '../../common/ImageModalLoading'

interface MenuOptionItem {
  itemName: string
  itemPrice: number
}

interface MenuOption {
  optionName: string
  isMultiple: boolean
  maxSelected?: number
  optionItems: MenuOptionItem[]
}

interface MenuType {
  menuName: string
  price: number
  description: string
  options: MenuOption[]
  option: {
    optionName: string
    isMultiple: boolean
  }
  optionItem: MenuOptionItem
}

const AddMenu = () => {
  const { control, handleSubmit, reset, getValues } = useForm<MenuType>()
  const [options, setOptions] = useState<MenuOption[]>([])
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(0)
  const [optionmax, setOptionmax] = useState<number>(0)
  const toast = useAlert()
  const groupid = useRecoilValue(shopGroupid)
  const setmenupage = useSetRecoilState(shopmenupage)
  const setLoading = useSetRecoilState(LoadingModal)

  const handleMenuImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLoading(true)
      await compressProfileImage(file)
      setLoading(false)
    }
  }

  const {
    image: menuImage,
    compressImage: compressProfileImage,
    compressedFile: profileCompressedFile,
  } = useImageCompression('/img/preview.jpg')

  // 새 옵션을 추가하는 함수입니다.
  // data 파라미터로 전달된 옵션 정보를 기반으로 옵션 리스트에 새 옵션을 추가합니다.
  const handleAddOption = (data: MenuOption) => {
    if (!data.optionName.trim()) {
      toast('옵션 이름을 입력해주세요.', 2000, 'error')
      return
    }
    const regex = /^[a-zA-Z가-힣\s]+$/
    if (!regex.test(data.optionName.trim())) {
      toast('정확한 이름을 입력해주세요.', 2000, 'error')
      return
    }
    if (options.some((option) => option.optionName === data.optionName.trim())) {
      toast('이미 존재하는 옵션 이름입니다.', 2000, 'error')
      return
    }

    setOptions((prevOptions) => [
      ...prevOptions,
      {
        optionName: data.optionName,
        isMultiple: data.isMultiple,
        maxSelected: optionmax,
        optionItems: [],
      },
    ])

    reset({ ...getValues(), option: { optionName: '', isMultiple: false } })
  }

  // 옵션 선택을 처리하는 함수입니다.
  // 선택된 옵션의 인덱스를 상태로 설정합니다.
  const handleSelectOption = (event: SelectChangeEvent<number | null>, _child: React.ReactNode) => {
    setSelectedOptionIndex(event.target.value as number | null)
  }

  // 옵션 아이템을 추가하는 함수입니다.
  // 선택된 옵션 카테고리에 새 옵션 아이템을 추가합니다.
  const handleAddOptionItem = (data: MenuOptionItem) => {
    if (selectedOptionIndex === null) {
      toast('옵션 종류를 선택해주세요', 2000, 'error')
      return
    }

    if (!data.itemName.trim()) {
      toast('옵션아이템 이름을 입력해주세요', 2000, 'error')
      return
    }
    const regex = /^[a-zA-Z가-힣\s]+$/
    if (!regex.test(data.itemName.trim())) {
      toast('이름을 정확히 입력해주세요.', 2000, 'error')
      return
    }

    const PriceTest = data.itemPrice.toString()
    if (!PriceTest.trim() || Number(PriceTest) === 0 || /^0/.test(PriceTest)) {
      toast('옵션아이템 가격을 입력해주세요.', 2000, 'error')
      return
    }

    if (
      options[selectedOptionIndex]?.optionItems.some(
        (item) => item.itemName === data.itemName.trim(),
      )
    ) {
      toast('이미 존재하는 옵션 아이템 이름입니다.', 2000, 'error')
      return
    }

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions]

      if (newOptions[selectedOptionIndex]) {
        newOptions[selectedOptionIndex].optionItems.push(data)
      }
      return newOptions
    })

    reset({ ...getValues(), optionItem: { itemName: '', itemPrice: 0 } })
  }

  const handleoptionvalue = (event: SelectChangeEvent<unknown>, _child: React.ReactNode) => {
    setOptionmax(event.target.value as number)
  }

  const handleDeltetOption = (index: number): void => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index))
  }

  const onSubmit = (data: MenuType) => {
    if (!data.menuName?.trim()) {
      toast('메뉴 이름을 입력해주세요.', 2000, 'error')
      return
    }
    const priceStr = data.price?.toString()
    if (!priceStr?.trim() || Number(priceStr) === 0 || /^0/.test(priceStr)) {
      toast('메뉴 가격을 올바르게 입력해주세요.', 2000, 'error')
      return
    }
    if (!data.description?.trim()) {
      toast('메뉴 설명을 입력해주세요.', 2000, 'error')
      return
    }

    const Addmenuformdata = new FormData()
    if (profileCompressedFile) {
      Addmenuformdata.append('menuThumbnailImage', profileCompressedFile)
    }
    const completeData = {
      menuName: data.menuName,
      price: data.price,
      description: data.description,
      options: options,
    }
    Addmenuformdata.append(
      'registerMenuRequest',
      new Blob([JSON.stringify(completeData)], { type: 'application/json' }),
    )

    addsellerMenu({ groupid, formdata: Addmenuformdata })
      .then(() => {
        toast('메뉴 등록에 성공하였습니다.', 2000, 'success')
        reset({
          menuName: '',
          price: 0,
          description: '',
          option: { optionName: '', isMultiple: false },
          optionItem: { itemName: '', itemPrice: 0 },
        })
        setOptions([])
        setTimeout(() => {
          setmenupage(1)
        }, 2000)
      })
      .catch(() => {
        toast('메뉴 등록에 실패했습니다.', 2000, 'error')
      })
  }

  return (
    <S.Wrapper onSubmit={handleSubmit(onSubmit)}>
      <S.WritingContainer>
        <S.MenuWritingWrapper>
          <S.Menubox>
            <S.ImgContainer>
              <S.PreviewBox>
                <input type="file" id="mainImage" onChange={handleMenuImageChange} />
                {menuImage && <img src={menuImage} alt="대표 이미지 미리보기" />}
              </S.PreviewBox>
              <S.ImageDescription>메뉴 이미지</S.ImageDescription>
            </S.ImgContainer>

            <S.TextContainer>
              <Controller
                name="menuName"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <S.StyleInput label="메뉴 이름" showErrorMessage={false} {...field} />
                )}
              />
              <Controller
                name="price"
                defaultValue={0}
                control={control}
                render={({ field }) => (
                  <S.StyleInput label="가격" type="number" showErrorMessage={false} {...field} />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <S.StyleInput
                    label="메뉴 설명"
                    multiline={true}
                    rows={2}
                    showErrorMessage={false}
                    {...field}
                  />
                )}
              />
            </S.TextContainer>
          </S.Menubox>
          <S.OptionCateContainer>
            <Controller
              name="option"
              control={control}
              defaultValue={{ optionName: '', isMultiple: false }}
              render={({ field }) => (
                <S.OptionCatebox>
                  <S.CateTitle>메뉴 옵션 카테고리 등록</S.CateTitle>
                  <div>
                    <InputField
                      label="옵션 이름"
                      value={field.value.optionName !== null ? field.value.optionName : ''}
                      onChange={(e) =>
                        field.onChange({ ...field.value, optionName: e.target.value })
                      }
                    />
                  </div>

                  <S.CheckWrapper>
                    <label>
                      <span>다중 선택:</span>
                      <S.OptionCheck
                        type="checkbox"
                        checked={field.value.isMultiple || false}
                        onChange={(e) => {
                          field.onChange({ ...field.value, isMultiple: e.target.checked })
                          if (!e.target.checked) {
                            setOptionmax(0)
                          }
                          if (e.target.checked) {
                            setOptionmax(2)
                          }
                        }}
                      />
                    </label>
                    {field.value.isMultiple && (
                      <S.StyledSelect value={optionmax} onChange={handleoptionvalue}>
                        {Array.from({ length: 8 }, (_, index) => (
                          <MenuItem value={index + 2} key={index + 2}>
                            {index + 2}
                          </MenuItem>
                        ))}
                      </S.StyledSelect>
                    )}

                    <Button
                      variant="contained"
                      type="button"
                      onClick={() => handleAddOption({ ...field.value, optionItems: [] })}
                    >
                      옵션 종류 등록
                    </Button>
                  </S.CheckWrapper>
                </S.OptionCatebox>
              )}
            />
          </S.OptionCateContainer>
          {options.length > 0 && (
            <S.DetailoptionContainer>
              <Controller
                name="optionItem"
                control={control}
                defaultValue={{ itemName: '', itemPrice: 0 }}
                render={({ field }) => (
                  <>
                    <S.DetailWriting>
                      <InputField
                        label="옵션 아이템 이름"
                        value={field.value.itemName}
                        showErrorMessage={false}
                        onChange={(e) =>
                          field.onChange({ ...field.value, itemName: e.target.value })
                        }
                      />
                      <S.StyleInput
                        label="옵션 아이템 가격"
                        type="number"
                        value={field.value.itemPrice}
                        showErrorMessage={false}
                        onChange={(e) =>
                          field.onChange({ ...field.value, itemPrice: e.target.value })
                        }
                      />
                    </S.DetailWriting>
                    <S.DetailBtnbox>
                      <Select value={selectedOptionIndex} onChange={handleSelectOption}>
                        {options.map((option, index) => (
                          <MenuItem value={index} key={index}>
                            {option.optionName}
                          </MenuItem>
                        ))}
                      </Select>
                      <Button variant="contained" onClick={() => handleAddOptionItem(field.value)}>
                        상세 옵션 등록
                      </Button>
                    </S.DetailBtnbox>
                  </>
                )}
              />
            </S.DetailoptionContainer>
          )}
        </S.MenuWritingWrapper>
        <S.MenuOptionView>
          <ul>
            {options.map((option, optionIndex) => (
              <S.Stylelist key={optionIndex}>
                옵션 종류: {option.optionName},{' '}
                <span>다중 선택 : {option.isMultiple ? '가능' : '불가능'}</span>
                <ul>
                  {option.optionItems
                    .filter((item) => item && item.itemName && item.itemPrice)
                    .map((item, itemIndex) => (
                      <S.Detailli key={itemIndex}>
                        상세 옵션: {item.itemName}, 가격: {item.itemPrice}원
                      </S.Detailli>
                    ))}
                </ul>
                <S.Optiondeletebtn onClick={() => handleDeltetOption(optionIndex)}>
                  <img src="/img/delete.svg" alt="" />
                </S.Optiondeletebtn>
              </S.Stylelist>
            ))}
          </ul>
        </S.MenuOptionView>
      </S.WritingContainer>
      <S.AddMenuBtnbox>
        <Button variant="contained" color="primary" type="submit">
          메뉴 등록
        </Button>
      </S.AddMenuBtnbox>
      <ImageModalLoading />
    </S.Wrapper>
  )
}

export default AddMenu
