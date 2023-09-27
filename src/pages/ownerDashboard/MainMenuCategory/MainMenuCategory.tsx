import React, { useEffect } from 'react'
import InputField from '../../../pages/common/InputField'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormDataType } from '../../../types/user'
import useAlert from '../../../pages/common/hooks/useAlert'
import * as S from './MainMenuCategory.style'
import {
  getMenuGroups,
  addMenuGroups,
  deleteMenuGroups,
  patchMenuGroups,
  patchindexMenuGroups,
} from '../../../api/restaurant'
import { useRecoilValue } from 'recoil'
import { selectedShopIdState } from '../../../atoms/restaurantsAtoms'
import { useRecoilState } from 'recoil'
import { shopMenuGroups } from '../../../atoms/restaurantsAtoms'

const MainMenuCategory: React.FC = () => {
  const currentId = useRecoilValue(selectedShopIdState)
  const [menugroup, setMenugroup] = useRecoilState(shopMenuGroups)

  // 카드 데이터 및 드래그/드롭 관련 상태
  const [placeholderIndex, setPlaceholderIndex] = React.useState<number | null>(null) // placeholder의 위치를 결정
  const [dragSrcIndex, setDragSrcIndex] = React.useState<number | null>(null) // 현재 드래그 중인 카드의 인덱스
  const { register, handleSubmit, setValue, formState } = useForm<FormDataType>()
  const { errors } = formState
  const toast = useAlert()

  useEffect(() => {
    const getCate = async () => {
      try {
        const response = await getMenuGroups(currentId)
        setMenugroup(response)
      } catch (error) {
        console.error(error)
      }
    }
    getCate()
  }, [currentId])

  // 드래그 시작 시 실행되는 함수
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDragSrcIndex(index) // 드래그를 시작한 아이템의 인덱스를 상태로 저장
    e.dataTransfer.effectAllowed = 'move' // 드래그 앤 드롭 동작에서 'move' 허용
    e.dataTransfer.setData('text/plain', '') // 드래그 중 불필요한 텍스트 표시를 방지 (드래그하는 요소의 정보를 문자열로 설정하지만 여기서는 빈 문자열을 사용)
  }

  // 드래그가 종료되면 실행되는 함수
  const handleDragEnd = () => {
    setDragSrcIndex(null) // 드래그 소스 인덱스를 초기화
    setPlaceholderIndex(null) // placeholder 인덱스를 초기화
  }

  // 드래그 중일 때 실행되는 함수
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault() // 기본 동작을 방지 (드래그 앤 드롭이 정상적으로 작동하게 함)
    e.dataTransfer.dropEffect = 'move' // 드롭 허용 효과를 'move'로 설정
  }

  // 드롭할 때 실행되는 함수
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    if (dragSrcIndex === null) return
    const draggedItem = menugroup[dragSrcIndex]
    const newMenugroups = [...menugroup]
    newMenugroups.splice(dragSrcIndex, 1)
    if (dragSrcIndex < dropIndex) dropIndex--
    newMenugroups.splice(dropIndex, 0, draggedItem)
    setMenugroup(newMenugroups)
    setPlaceholderIndex(null)
    patchindexMenuGroups({
      shop_id: currentId,
      menuGroupSequence: dropIndex + 1,
      menuGroupId: draggedItem.menuGroupId,
    })
      .then(() => {
        toast('카테고리 순서변경이 반영되었습니다.', 2000, 'success')
      })
      .catch(() => {
        toast('카테고리 순서변경에 실패하였습니다.', 2000, 'error')
        setMenugroup(menugroup)
      })
  }

  // 드래그 아이템이 다른 아이템 위에 올라갔을 때의 이벤트 핸들러
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault() // 기본 이벤트를 방지
    const nextIndex = dragSrcIndex !== null ? dragSrcIndex + 1 : null // 다음 인덱스를 계산 (dragSrcIndex가 null이 아니라면 dragSrcIndex + 1, 아니면 null)

    // 드래그 중인 아이템이 현재 아이템이 아니고, placeholder의 위치가 현재 아이템이 아니며, 다음 아이템이 아니라면 placeholder 인덱스를 업데이트
    if (dragSrcIndex !== index && placeholderIndex !== index && index !== nextIndex) {
      setPlaceholderIndex(index) // placeholder 인덱스를 현재 아이템의 인덱스로 설정
    }
  }

  // 카테고리 제출 핸들러
  const onCategorySubmit = (data: FormDataType) => {
    setValue('menuCategory', '')
    addMenuGroups({ shop_id: currentId, menuGroupName: data.menuCategory })
      .then(async () => {
        const reload = await getMenuGroups(currentId)
        setMenugroup(reload)
        toast('메뉴카테고리가 정상적으로 추가되었습니다', 2000, 'success')
      })
      .catch(() => {
        toast('메뉴카테고리가 등록에 실패했습니다', 2000, 'error')
      })
  }

  // 카테고리 입력 변경 핸들러
  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z가-힣ㄱ-ㅎ\s]/g, '')
  }

  // 수정 핸들러
  const handleEdit = (menuGroupId: number) => {
    const newName = prompt('수정할 카테고리명을 입력해주세요.')
    if (newName !== null) {
      patchMenuGroups({ shop_id: currentId, menuGroupId: menuGroupId, menuGroupName: newName })
        .then(async () => {
          const reload = await getMenuGroups(currentId)
          setMenugroup(reload)
          toast('메뉴카테고리가 정상적으로 수정되었습니다', 2000, 'success')
        })
        .catch(() => {
          toast('메뉴카테고리 수정에 실패했습니다.', 2000, 'error')
        })
    }
  }

  // 삭제 핸들러
  const handleDelete = (menuGroupId: number) => {
    deleteMenuGroups({ shop_id: currentId, menuGroupId: menuGroupId })
      .then(async () => {
        const reload = await getMenuGroups(currentId)
        setMenugroup(reload)
        toast('메뉴카테고리가 정상적으로 삭제되었습니다', 2000, 'success')
      })
      .catch((error) => {
        toast('메뉴카테고리 삭제에 실패했습니다.', 2000, 'error')
        console.error(error)
      })
  }

  useEffect(() => {
    if (errors.menuCategory) {
      toast('정확한 카테고리를 입력해주세요.', 3000, 'error')
    }
  }, [errors.menuCategory])

  return (
    <S.Wrapper>
      <S.Title>메뉴 대분류 관리</S.Title>
      <S.From onSubmit={handleSubmit(onCategorySubmit)}>
        <InputField
          label="메뉴 추가하기"
          maxLength={10}
          placeholder="한글 또는 영어만 입력 가능합니다."
          {...register('menuCategory', {
            required: true,
            pattern: /^[a-zA-Z가-힣]+$/,
          })}
          onChange={handleCategoryInputChange}
          errorMessage={errors.menuCategory && '정확한 카테고리를 입력해주세요.'}
        />
        <S.StyleButton type="submit" variant="contained">
          카테고리 추가
        </S.StyleButton>
      </S.From>
      <S.Categorylist>
        {
          // 반복문을 사용해 cards 배열의 각 아이템을 렌더링
          menugroup.map((content, index) => (
            <React.Fragment key={content.menuGroupId}>
              {
                // 만약 현재 인덱스가 placeholderIndex와 같다면 Placeholder 컴포넌트를 렌더링
                index === placeholderIndex && (
                  <S.Placeholder
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, placeholderIndex)}
                  />
                )
              }

              <S.StyledItemContainer
                onDragOver={
                  // 만약 현재 인덱스가 마지막 아이템의 인덱스라면, 드래그 오버 이벤트를 핸들링
                  index === menugroup.length - 1
                    ? (e) => {
                        e.preventDefault()
                        // 만약 placeholderIndex가 마지막 위치가 아니라면, 이를 마지막 위치로 설정
                        if (placeholderIndex !== menugroup.length) {
                          setPlaceholderIndex(menugroup.length)
                        }
                      }
                    : undefined
                }
              >
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={10}>
                    <S.StyleCard
                      draggable="true" // 카드 아이템이 드래그 가능하도록 설정
                      onDragStart={(e) => handleDragStart(e, index)} // 드래그 시작 이벤트 핸들러
                      onDragEnter={(e) => handleDragEnter(e, index)} // 드래그 엔터 이벤트 핸들러
                      onDrop={(e) => {
                        // 드롭 이벤트 핸들러. 만약 placeholderIndex가 마지막 위치라면, 드롭 이벤트를 처리
                        if (placeholderIndex === menugroup.length) {
                          handleDrop(e, menugroup.length)
                        }
                      }}
                      onDragEnd={handleDragEnd} // 드래그 종료 이벤트 핸들러
                    >
                      <div style={{ flexGrow: 1 }}>{content.menuGroupName}</div>
                    </S.StyleCard>
                  </Grid>
                  <S.StyleGrid item xs={6}>
                    <S.StyleitemBtn onClick={() => handleEdit(content.menuGroupId)}>
                      수정
                    </S.StyleitemBtn>
                    <S.StyleitemBtn onClick={() => handleDelete(content.menuGroupId)}>
                      삭제
                    </S.StyleitemBtn>
                  </S.StyleGrid>
                </Grid>
              </S.StyledItemContainer>
            </React.Fragment>
          ))
        }
        {
          // 만약 placeholderIndex가 마지막 위치라면, 마지막 위치에 Placeholder 컴포넌트를 추가
          placeholderIndex === menugroup.length && (
            <S.Placeholder
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, placeholderIndex)}
            />
          )
        }
      </S.Categorylist>
    </S.Wrapper>
  )
}

export default MainMenuCategory
