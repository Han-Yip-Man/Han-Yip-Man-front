import React, { useEffect } from 'react'
import InputField from '../../common/InputField'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormData } from '../../../types/user'
import useAlert from '../../../hooks/useAlert'
import * as S from './MainMenuCategory.style'

const MainMenuCategory: React.FC = () => {
  // 카드 데이터 및 드래그/드롭 관련 상태
  const [cards, setCards] = React.useState<(string | undefined)[]>([
    '뼈치킨',
    '순살치킨',
    '특수부위',
    '사이드메뉴',
    '음료 & 주류',
    '공기밥',
  ])
  const [placeholderIndex, setPlaceholderIndex] = React.useState<number | null>(null) // placeholder의 위치를 결정
  const [dragSrcIndex, setDragSrcIndex] = React.useState<number | null>(null) // 현재 드래그 중인 카드의 인덱스
  const { register, handleSubmit, setValue, formState } = useForm<FormData>()
  const { errors } = formState
  const toast = useAlert()

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
    if (dragSrcIndex === null) return // dragSrcIndex가 null이면 함수 종료 (드래그된 아이템이 없음)

    const draggedItem = cards[dragSrcIndex] // 드래그된 아이템을 가져옴
    const newCards = [...cards] // 카드 배열의 복사본을 생성

    // 드래그된 아이템을 배열에서 제거
    newCards.splice(dragSrcIndex, 1)

    // 드래그된 아이템이 제거된 후의 드롭 인덱스를 조정 (원래 위치보다 뒤에 드롭할 경우 인덱스가 하나 줄어듬)
    if (dragSrcIndex < dropIndex) dropIndex--
    newCards.splice(dropIndex, 0, draggedItem) // 드롭할 위치에 드래그된 아이템을 삽입

    setCards(newCards) // 카드 배열을 업데이트
    setPlaceholderIndex(null) // 드롭 후 placeholder 인덱스를 초기화
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
  const onCategorySubmit = (data: FormData) => {
    setCards((prev) => [...prev, data.menuCategory]) // 이전 카드 목록에 새 카테고리 추가
    setValue('menuCategory', '') // 'menuCategory' 입력 필드의 값을 리셋
  }

  // 카테고리 입력 변경 핸들러
  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z가-힣ㄱ-ㅎ\s]/g, '') // 입력값에서 특정 문자를 제외한 모든 문자를 제거 (영문자, 한글, 공백만 허용)
  }

  // 수정 핸들러
  const handleEdit = (index: number) => {
    const newContent = prompt('새로운 이름을 입력하세요', cards[index]) // 사용자에게 새로운 이름 입력을 요청 (기본값으로 현재 카드의 내용을 제공)
    if (newContent !== null && newContent !== undefined) {
      // 새로운 내용이 null이나 undefined가 아니라면
      setCards((prev) => prev.map((content, i) => (i === index ? newContent : content))) // 해당 인덱스의 카드 내용을 업데이트
    }
  }

  // 삭제 핸들러
  const handleDelete = (index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index)) // 해당 인덱스의 카드를 제외한 모든 카드를 유지
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
          cards.map((content, index) => (
            <React.Fragment key={index}>
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
                  index === cards.length - 1
                    ? (e) => {
                        e.preventDefault()
                        // 만약 placeholderIndex가 마지막 위치가 아니라면, 이를 마지막 위치로 설정
                        if (placeholderIndex !== cards.length) {
                          setPlaceholderIndex(cards.length)
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
                        if (placeholderIndex === cards.length) {
                          handleDrop(e, cards.length)
                        }
                      }}
                      onDragEnd={handleDragEnd} // 드래그 종료 이벤트 핸들러
                    >
                      <div style={{ flexGrow: 1 }}>{content}</div>
                    </S.StyleCard>
                  </Grid>
                  <S.StyleGrid item xs={6}>
                    <S.StyleitemBtn onClick={() => handleEdit(index)}>수정</S.StyleitemBtn>
                    <S.StyleitemBtn onClick={() => handleDelete(index)}>삭제</S.StyleitemBtn>
                  </S.StyleGrid>
                </Grid>
              </S.StyledItemContainer>
            </React.Fragment>
          ))
        }
        {
          // 만약 placeholderIndex가 마지막 위치라면, 마지막 위치에 Placeholder 컴포넌트를 추가
          placeholderIndex === cards.length && (
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
