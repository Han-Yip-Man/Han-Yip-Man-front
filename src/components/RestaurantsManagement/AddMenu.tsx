import React, { useState } from 'react'
import styled from '@emotion/styled'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputField from '../common/InputField'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'

interface MenuOptionItem {
  itemName: string
  itemPrice: string
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
  option: {
    optionName: string
    isMultiple: boolean
  }
  optionItem: MenuOptionItem
}

const AddMenu = () => {
  const { control, handleSubmit, reset } = useForm<MenuType>()
  const [category, setCategory] = useState('뼈치킨')
  const [options, setOptions] = useState<MenuOption[]>([])
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)

  const handleAddOption = (data: MenuOption) => {
    if (!data.optionName.trim()) {
      alert('옵션 이름을 입력해주세요.')
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

    reset({ option: { optionName: '', isMultiple: false } })
  }

  const handleSelectOption = (event: SelectChangeEvent<number | null>, _child: React.ReactNode) => {
    setSelectedOptionIndex(event.target.value as number | null)
  }

  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setMainImage(URL.createObjectURL(file))
    }
  }

  const handleAddOptionItem = (data: MenuOptionItem) => {
    if (selectedOptionIndex === null) {
      alert('옵션 종류를 선택해주세요.')
      return
    }

    if (!data.itemName.trim()) {
      alert('옵션 아이템 이름을 입력해주세요.')
      return
    }

    if (!data.itemPrice.trim()) {
      alert('옵션 아이템 가격을 입력해주세요.')
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

    reset({ optionItem: { itemName: '', itemPrice: '' } })
  }

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string)
  }

  const onSubmit = (data: MenuType) => {
    console.log(data)
    console.log('어흥')
  }

  console.log(options)
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <CategorySelectbox>
        <StyleSelect value={category} onChange={handleChange}>
          <MenuItem value="뼈치킨">뼈치킨</MenuItem>
          <MenuItem value="순살치킨">순살치킨</MenuItem>
          <MenuItem value="사이드메뉴">사이드메뉴</MenuItem>
        </StyleSelect>
      </CategorySelectbox>

      <WritingContainer>
        <MenuWritingWrapper>
          <Menubox>
            <ImgContainer>
              <PreviewBox>
                <input type="file" id="mainImage" onChange={handleMainImageChange} />
                {mainImage && <img src={mainImage} alt="대표 이미지 미리보기" />}
              </PreviewBox>
              <ImageDescription>메뉴 이미지</ImageDescription>
            </ImgContainer>

            <TextContainer>
              <Controller
                name="menuName"
                control={control}
                render={({ field }) => (
                  <StyleInput label="메뉴 이름" showErrorMessage={false} {...field} />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <StyleInput label="가격" type="number" showErrorMessage={false} {...field} />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <StyleInput
                    label="메뉴 설명"
                    multiline={true}
                    rows={2}
                    showErrorMessage={false}
                    {...field}
                  />
                )}
              />
            </TextContainer>
          </Menubox>

          <OptionCateContainer>
            <Controller
              name="option"
              control={control}
              defaultValue={{ optionName: '', isMultiple: false }}
              render={({ field }) => (
                <OptionCatebox>
                  <CateTitle>메뉴 옵션 카테고리 등록</CateTitle>
                  <InputField
                    label="옵션 이름"
                    value={field.value.optionName}
                    onChange={(e) => field.onChange({ ...field.value, optionName: e.target.value })}
                  />
                  <CheckWrapper>
                    <label>
                      <span>다중 선택:</span>
                      <OptionCheck
                        type="checkbox"
                        checked={field.value.isMultiple}
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
                  </CheckWrapper>
                </OptionCatebox>
              )}
            />
          </OptionCateContainer>

          {options.length > 0 && (
            <DetailoptionContainer>
              <Controller
                name="optionItem"
                control={control}
                defaultValue={{ itemName: '', itemPrice: '' }}
                render={({ field }) => (
                  <>
                    <DetailWriting>
                      <InputField
                        label="옵션 아이템 이름"
                        value={field.value.itemName}
                        showErrorMessage={false}
                        onChange={(e) =>
                          field.onChange({ ...field.value, itemName: e.target.value })
                        }
                      />
                      <InputField
                        label="옵션 아이템 가격"
                        type="number"
                        value={field.value.itemPrice}
                        showErrorMessage={false}
                        onChange={(e) =>
                          field.onChange({ ...field.value, itemPrice: e.target.value })
                        }
                      />
                    </DetailWriting>
                    <DetailBtnbox>
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
                    </DetailBtnbox>
                  </>
                )}
              />
            </DetailoptionContainer>
          )}
        </MenuWritingWrapper>

        <MenuOptionView>
          <ul>
            {options.map((option, optionIndex) => (
              <Stylelist key={optionIndex}>
                옵션 종류: {option.optionName},{' '}
                <span>다중 선택 : {option.isMultiple ? '가능' : '불가능'}</span>
                <ul>
                  {option.optionItem
                    .filter((item) => item && item.itemName && item.itemPrice)
                    .map((item, itemIndex) => (
                      <Detailli key={itemIndex}>
                        상세 옵션: {item.itemName}, 가격: {item.itemPrice}원
                      </Detailli>
                    ))}
                </ul>
              </Stylelist>
            ))}
          </ul>
        </MenuOptionView>
      </WritingContainer>
      <AddMenuBtnbox>
        <Button variant="contained" color="primary" type="submit">
          메뉴 등록
        </Button>
      </AddMenuBtnbox>
    </Wrapper>
  )
}

export default AddMenu

const DetailBtnbox = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  height: 140px;
  gap: 10px;
  button {
    height: 56px;
  }
`

const DetailWriting = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  height: 140px;
`

const DetailoptionContainer = styled.div`
  display: flex;
  padding-top: 30px;
  width: 100%;
  gap: 50px;
  justify-content: center;
  align-items: center;
`

const Detailli = styled.li`
  margin-left: 30px;
  margin-top: 3px;
  font-size: 15px;
`

const Stylelist = styled.li`
  margin-bottom: 30px;
  font-size: 18px;
`

const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  label {
    display: flex;
    align-items: center;
  }
`

const OptionCheck = styled.input`
  width: 25px;
  height: 25px;
`

const CateTitle = styled.h2`
  margin-bottom: 20px;
`

const OptionCateContainer = styled.div`
  border-top: 1px solid #000;
  width: 95%;
  margin: 30px auto 0 auto;
  display: flex;
  justify-content: center;
`

const OptionCatebox = styled.div`
  width: 50%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyleInput = styled(InputField)``

const PreviewBox = styled.div`
  position: relative;
  width: 190px;
  height: 190px;
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

const ImageDescription = styled.span`
  font-size: 14px;
`

const Menubox = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  margin: 20px auto;
  width: 90%;
  gap: 50px;
`

const ImgContainer = styled.div`
  width: 30%;
  text-align: center;
`

const TextContainer = styled.div`
  flex: 1;
`

const StyleSelect = styled(Select)`
  width: 220px;
  height: 50px;
`

const Wrapper = styled.form`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
`

const CategorySelectbox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  padding-left: 30px;
  align-items: center;
`

const WritingContainer = styled.div`
  width: 100%;
  height: calc(100% - 110px);
  display: flex;
`

const MenuWritingWrapper = styled.div`
  width: 60%;
  height: 100%;
`
const MenuOptionView = styled.div`
  width: 40%;
  height: 100%;
`

const AddMenuBtnbox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;

  Button {
    height: 50px;
    width: 40%;
    font-size: 25px;
  }
`
