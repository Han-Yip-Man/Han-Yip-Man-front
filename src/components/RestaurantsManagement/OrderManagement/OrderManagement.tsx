import styled from '@emotion/styled'
import OrderManagementList from './OrderManagementList'
import { Stack } from '@mui/material'
import { DragDropContext, DropResult, Droppable, DroppableId } from 'react-beautiful-dnd'
import { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../../../hooks'

interface Item {
  id: string
  content: string
}

const waitItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: `wait-item-${i + 1}`,
  content: `Wait Item ${i + 1}`,
}))

const acceptItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: `accept-item-${i + 1}`,
  content: `Accept Item ${i + 1}`,
}))

const cookingItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: `cooking-item-${i + 1}`,
  content: `cooking Item ${i + 1}`,
}))

const deliveryItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: `delivery-item-${i + 1}`,
  content: `delivery Item ${i + 1}`,
}))

function OrderManagement() {
  const [waitList, setWaitList] = useState(waitItems)
  const [acceptList, setAcceptList] = useState(acceptItems)
  const [cookingList, setCookingList] = useState(cookingItems)
  const [deliveryList, setDeliveryList] = useState(deliveryItems)
  const { socket, connected } = useSocket('ws://58.123.150.14:8088')

  socket?.on('send_order_status_change', () => {
    // 리액트 쿼리 데이터 다시 받아오기
  })

  // 리액트 쿼리를 쓰던지해서 데이터 불러오기
  // 리액트 쿼리로 불러온 데이터로 목록 그려준다음
  // 드래그앤 드랍으로 아이템 이동하면 소켓 이벤트로 주문상태 변경및순서변경아이디 넘겨줄것
  // const { data } = useQuery(['orderStatus'], () =>
  //   getSellerOrderList('전역상태로 상점아이디 넣어줄것'),
  // )

  const getItemArray = useCallback(
    (droppableId: string): Item[] => {
      switch (droppableId) {
        case '주문대기':
          return waitList
        case '주문승인':
          return acceptList
        case '조리시작':
          return cookingList
        case '배달출발':
          return deliveryList
        default:
          throw new Error(`Unknown droppableId: ${droppableId}`)
      }
    },
    [waitList, acceptList, cookingList, deliveryList],
  )

  const updateState = useCallback((droppableId: string, newArray: Item[]) => {
    switch (droppableId) {
      case '주문대기':
        setWaitList(newArray)
        break
      case '주문승인':
        setAcceptList(newArray)
        break
      case '조리시작':
        setCookingList(newArray)
        break
      case '배달출발':
        setDeliveryList(newArray)
        break
      default:
        throw new Error(`Unknown droppableId: ${droppableId}`)
    }
  }, [])

  const handleOnDragEnd = useCallback(
    (result: DropResult): void => {
      const { source, destination } = result

      if (!destination) {
        if (source.droppableId === '주문대기') {
          const sourceArray = [...getItemArray(source.droppableId)]
          sourceArray.splice(source.index, 1)
          updateState(source.droppableId, sourceArray)
        }

        return
      }

      const allowedMoves: Record<DroppableId, DroppableId> = {
        주문대기: '주문승인',
        주문승인: '조리시작',
        조리시작: '배달출발',
      }

      if (source.droppableId === destination.droppableId) {
        // 같은 리스트에서 순서 변경할때
        const itemsArray = [...getItemArray(source.droppableId)]
        const [reorderedItem] = itemsArray.splice(source.index, 1)
        itemsArray.splice(destination.index, 0, reorderedItem)

        updateState(source.droppableId, itemsArray)
      }

      if (allowedMoves[source.droppableId] !== destination.droppableId) {
        return
      }

      if (source.droppableId !== destination.droppableId) {
        // 리스트 사이에 아이템 옮길때
        const sourceArray = [...getItemArray(source.droppableId)]
        const destArray = [...getItemArray(destination.droppableId)]

        const [movedItem] = sourceArray.splice(source.index, 1)
        destArray.splice(destination.index, 0, movedItem)

        updateState(source.droppableId, sourceArray)
        updateState(destination.droppableId, destArray)
      }
    },
    [updateState, getItemArray],
  )

  // useEffect(() => {
  // }, [])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Wrap>
        <CustomStack direction={{ xs: 'column', sm: 'row' }}>
          <Droppable droppableId={'주문대기'}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <OrderManagementList title={'주문대기'} items={waitList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={'주문승인'}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <OrderManagementList title={'주문승인'} items={acceptList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={'조리시작'}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <OrderManagementList title={'조리시작'} items={cookingList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={'배달출발'}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <OrderManagementList title={'배달출발'} items={deliveryList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CustomStack>
      </Wrap>
    </DragDropContext>
  )
}

export default OrderManagement

const Wrap = styled.div`
  padding: 50px;
`

const CustomStack = styled(Stack)`
  justify-content: space-around;
`
