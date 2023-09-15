// OrderManagementList.js
import styled from '@emotion/styled'
import { List } from '@mui/material'
import OrderListItem from './OrderListItem'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  title: string
  items: any
}

const switchColor = (title: string) => {
  switch (title) {
    case '주문승인':
      return 'green'
    case '조리시작':
      return 'orange'
    case '배달출발':
      return 'blue'
    default:
      return 'black'
  }
}

function OrderManagementList({ title, items }: Props) {
  return (
    <ListWrap>
      <TitleWrap>
        <Title style={{ color: switchColor(title) }}>{title}</Title>
      </TitleWrap>
      <CustomList>
        {items.map((item: any, index: number) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
              <OrderListItem
                draggableProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps}
                ref={provided.innerRef}
                textColor={switchColor(title)}
              />
            )}
          </Draggable>
        ))}
      </CustomList>
    </ListWrap>
  )
}

export default OrderManagementList

const ListWrap = styled.div`
  min-width: 270px;
  height: 790px;
  /* padding: 30px; */
  /* background-color: rgb(128, 128, 128, 0.2); */
  border: 1px solid gray;
  display: grid;
  grid-template-rows: 40px 1fr;
  padding-top: 20px;
`

const CustomList = styled(List)`
  overflow: scroll;
`

const TitleWrap = styled.div`
  display: grid;
  place-items: center;
  padding-bottom: 20px;
`

const Title = styled.div`
  display: grid;
  place-items: center;
`
