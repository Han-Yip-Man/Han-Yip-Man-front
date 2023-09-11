import React, { useState } from 'react'
import * as S from './AddMenu.style'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputField from '../../common/InputField'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import useAlert from '../../../hooks/useAlert'

interface MenuOptionItem {
  itemName: string
  itemPrice: number
}

interface MenuOption {
  optionName: string
  isMultiple: boolean
  optionItem: MenuOptionItem[]
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
  const [category, setCategory] = useState('뼈치킨')
  const [options, setOptions] = useState<MenuOption[]>([])
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(0)
  const [mainImage, setMainImage] = useState<string | null>('/img/preview.jpg')
  const toast = useAlert()

  // 새 옵션을 추가하는 함수입니다.
  // data 파라미터로 전달된 옵션 정보를 기반으로 옵션 리스트에 새 옵션을 추가합니다.
  const handleAddOption = (data: MenuOption) => {
    if (!data.optionName.trim()) {
      toast('옵션 이름을 입력해주세요.', 3000, 'error')
      return
    }

    setOptions((prevOptions) => [
      ...prevOptions,
      {
        optionName: data.optionName,
        isMultiple: data.isMultiple,
        optionItem: [],
      },
    ])

    reset({ ...getValues(), option: { optionName: '', isMultiple: false } })
  }

  // 옵션 선택을 처리하는 함수입니다.
  // 선택된 옵션의 인덱스를 상태로 설정합니다.
  const handleSelectOption = (event: SelectChangeEvent<number | null>, _child: React.ReactNode) => {
    setSelectedOptionIndex(event.target.value as number | null)
  }

  // 메인 이미지 변경을 처리하는 함수입니다.
  // 선택된 파일을 읽어와 상태로 설정하여 이미지 미리보기를 제공합니다.
  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setMainImage(URL.createObjectURL(file))
    }
  }

  // 옵션 아이템을 추가하는 함수입니다.
  // 선택된 옵션 카테고리에 새 옵션 아이템을 추가합니다.
  const handleAddOptionItem = (data: MenuOptionItem) => {
    if (selectedOptionIndex === null) {
      toast('옵션 종류를 선택해주세요', 3000, 'error')
      return
    }

    if (!data.itemName.trim()) {
      toast('옵션아이템 이름을 입력해주세요', 3000, 'error')
      return
    }

    const PriceTest = data.itemPrice.toString()
    if (!PriceTest.trim() || Number(PriceTest) === 0) {
      toast('옵션아이템 가격을 입력해주세요.', 3000, 'error')
      return
    }

    console.log('Data: ', data)

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions]
      console.log('Selected Option: ', newOptions[selectedOptionIndex])

      if (newOptions[selectedOptionIndex]) {
        newOptions[selectedOptionIndex].optionItem.push(data)
      }
      return newOptions
    })

    reset({ ...getValues(), optionItem: { itemName: '', itemPrice: 0 } })
  }

  // 카테고리 변경을 처리하는 함수입니다.
  // 선택된 카테고리 값을 상태로 설정합니다.
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string)
  }

  const onSubmit = (data: MenuType) => {
    if (!data.menuName?.trim()) {
      toast('메뉴 이름을 입력해주세요.', 3000, 'error')
      return
    }
    const priceStr = data.price?.toString()
    if (!priceStr?.trim() || Number(priceStr) === 0) {
      toast('메뉴 가격을 입력해주세요.', 3000, 'error')
      return
    }
    if (!data.description?.trim()) {
      toast('메뉴 설명을 입력해주세요.', 3000, 'error')
      return
    }

    const completeData = {
      ...data,
      options,
    }

    console.log(completeData)

    reset({
      menuName: '',
      price: 0,
      description: '',
      option: { optionName: '', isMultiple: false },
      optionItem: { itemName: '', itemPrice: 0 },
    })
    setOptions([])
  }

  console.log(options)
  return (
    <S.Wrapper onSubmit={handleSubmit(onSubmit)}>
      <S.CategorySelectbox>
        <S.StyleSelect value={category} onChange={handleChange}>
          <MenuItem value="뼈치킨">뼈치킨</MenuItem>
          <MenuItem value="순살치킨">순살치킨</MenuItem>
          <MenuItem value="사이드메뉴">사이드메뉴</MenuItem>
        </S.StyleSelect>
      </S.CategorySelectbox>

      <S.WritingContainer>
        <S.MenuWritingWrapper>
          <S.Menubox>
            <S.ImgContainer>
              <S.PreviewBox>
                <input type="file" id="mainImage" onChange={handleMainImageChange} />
                {mainImage && <img src={mainImage} alt="대표 이미지 미리보기" />}
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
                  <InputField
                    label="옵션 이름"
                    value={field.value.optionName !== null ? field.value.optionName : ''}
                    onChange={(e) => field.onChange({ ...field.value, optionName: e.target.value })}
                  />
                  <S.CheckWrapper>
                    <label>
                      <span>다중 선택:</span>
                      <S.OptionCheck
                        type="checkbox"
                        checked={field.value.isMultiple || false}
                        onChange={(e) =>
                          field.onChange({ ...field.value, isMultiple: e.target.checked })
                        }
                      />
                    </label>
                    <Button
                      variant="contained"
                      type="button"
                      onClick={() => handleAddOption({ ...field.value, optionItem: [] })}
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
                  {option.optionItem
                    .filter((item) => item && item.itemName && item.itemPrice)
                    .map((item, itemIndex) => (
                      <S.Detailli key={itemIndex}>
                        상세 옵션: {item.itemName}, 가격: {item.itemPrice}원
                      </S.Detailli>
                    ))}
                </ul>
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
    </S.Wrapper>
  )
}

export default AddMenu