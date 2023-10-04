import styled from '@emotion/styled'
import OrderManagementList from './OrderManagementList'
import { Stack } from '@mui/material'
import { DragDropContext, DropResult, Droppable, DroppableId } from 'react-beautiful-dnd'
import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAlert, useSocketContext } from '../../common/hooks'
import { getSellerOrderList } from '../../../api/order'

interface Data {
  address: string
  menuResponses: []
  orderId: number
  orderStatus: string
  orderedTime: string
  totalAmount: number
  orderSequence: number
}

function OrderManagement() {
  const { data } = useQuery(['orderList'], () => getSellerOrderList(11419))
  const [paidList, setPaidList] = useState<Data[]>([])
  const [takeOverList, setTakeOverList] = useState<Data[]>([])
  const [cookingList, setCookingList] = useState<Data[]>([])
  const [deliveryList, setDeliveryList] = useState<Data[]>([])
  const qc = useQueryClient()
  const { socket } = useSocketContext()
  const toast = useAlert()

  const sortOrders = useCallback((orderArr: Data[]) => {
    return orderArr.sort((a, b) => a.orderSequence - b.orderSequence)
  }, [])

  const getItemArray = useCallback(
    (droppableId: string) => {
      switch (droppableId) {
        case 'PAID':
          return paidList
        case 'TAKEOVER':
          return takeOverList
        case 'COOKING':
          return cookingList
        case 'DELIVERY':
          return deliveryList
        default:
          throw new Error(`Unknown droppableId: ${droppableId}`)
      }
    },
    [paidList, takeOverList, cookingList, deliveryList],
  )

  const updateState = useCallback((droppableId: string, newArray: Data[]) => {
    const sorted = newArray
    switch (droppableId) {
      case 'PAID':
        setPaidList(sorted)
        break
      case 'TAKEOVER':
        setTakeOverList(sorted)
        break
      case 'COOKING':
        setCookingList(sorted)
        break
      case 'DELIVERY':
        setDeliveryList(sorted)
        break
      default:
        throw new Error(`Unknown droppableId: ${droppableId}`)
    }
  }, [])

  const handleOnDragEnd = useCallback(
    (result: DropResult): void => {
      const { source, destination, draggableId } = result

      const movedItem = {
        orderId: draggableId,
        orderStatus: destination?.droppableId,
        orderSequence: destination?.index,
      }

      if (!destination) {
        if (source.droppableId === 'PAID') {
          const sourceArray = [...getItemArray(source.droppableId)]
          sourceArray.splice(source.index, 1)
          updateState(source.droppableId, sourceArray)
          socket?.emit(
            'send_order_status_change',
            { ...movedItem, orderStatus: 'CANCELED' },
            (res: any) => {
              console.log('취소응답', res)
              qc.invalidateQueries(['orderList'])
            },
          )
        }
        return
      }

      const allowedMoves: Record<DroppableId, DroppableId> = {
        PAID: 'TAKEOVER',
        TAKEOVER: 'COOKING',
        COOKING: 'DELIVERY',
      }

      if (source.droppableId === destination.droppableId) {
        // 같은 리스트에서 순서 변경할때
        const itemsArray = [...getItemArray(source.droppableId)]
        const [reorderedItem] = itemsArray.splice(source.index, 1)
        itemsArray.splice(destination.index, 0, reorderedItem)

        updateState(source.droppableId, itemsArray)
        // socket?.emit('send_order_status_change', movedItem, (res: any) => {
        //   console.log('응답', res)
        //   if (source.droppableId === res.orderStatus) {
        //     toast('주문 순서가 정상적으로 변경되었습니다.', 3000, 'success')
        //   }
        //   /// 이게 세번째 함수
        //   qc.invalidateQueries(['orderList'])
        // })
      }

      // if (allowedMoves[source.droppableId] !== destination.droppableId) {
      //   console.log(allowedMoves[source.droppableId], destination.droppableId)
      //   toast('이전 상태로 변경이 불가능합니다.', 3000, 'warning')
      //   return
      // }

      if (source.droppableId !== destination.droppableId) {
        // 리스트 사이에 아이템 옮길때
        const sourceArray = [...getItemArray(source.droppableId)]
        const destArray = [...getItemArray(destination.droppableId)]

        const [movedItem] = sourceArray.splice(source.index, 1)
        destArray.splice(destination.index, 0, movedItem)

        updateState(source.droppableId, sourceArray)
        updateState(destination.droppableId, destArray)
      }
      socket?.emit('send_order_status_change', movedItem, (res: any) => {
        console.log('응답', res)
        if (res.message === '주문 상태가 정상 변경되었습니다.') {
          toast(res.message, 3000, 'success')
        }
        /// 이게 세번째 함수
        qc.invalidateQueries(['orderList'])
      })
    },
    [updateState, getItemArray],
  )

  // const handleOnDragEnd = (result: DropResult) => {
  //   const movedItem = {
  //     orderId: result.draggableId,
  //     orderStatus: result.destination?.droppableId,
  //     orderSequence: result.destination?.index,
  //   }
  //   const allowedMoves: Record<DroppableId, DroppableId> = {
  //     PAID: 'TAKEOVER',
  //     TAKEOVER: 'COOKING',
  //     COOKING: 'DELIVERY',
  //   }
  //   if (allowedMoves[result.source.droppableId] !== result.destination?.droppableId) {
  //     return
  //   }
  //   if (!result.destination) {
  //     if (result.source.droppableId === 'PAID') {
  //       socket?.emit(
  //         'send_order_status_change',
  //         { ...movedItem, orderStatus: 'CANCELED' },
  //         (res: any) => {
  //           console.log('취소응답', res)
  //           qc.invalidateQueries(['orderList'])
  //         },
  //       )
  //     }
  //   }
  //   console.log('옮겨진아이템', movedItem)
  //   socket?.emit('send_order_status_change', movedItem, (res: any) => {
  //     console.log('응답', res)
  //     /// 이게 세번째 함수
  //     qc.invalidateQueries(['orderList'])
  //   })
  // }

  useEffect(() => {
    if (data) {
      setPaidList(sortOrders(data.paid))
      setTakeOverList(sortOrders(data.takeover))
      setCookingList(sortOrders(data.cooking))
      setDeliveryList(sortOrders(data.delivery))
    }
  }, [data])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Wrap>
        <CustomStack direction={{ xs: 'column', sm: 'row' }}>
          {data && (
            <>
              <Droppable droppableId={'PAID'}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <OrderManagementList title={'주문대기'} items={paidList} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId={'TAKEOVER'}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <OrderManagementList title={'주문승인'} items={takeOverList} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId={'COOKING'}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <OrderManagementList title={'조리시작'} items={cookingList} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId={'DELIVERY'}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <OrderManagementList title={'배달출발'} items={deliveryList} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </>
          )}
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
