import * as S from './EditRestaurant.style'
import { Grid, TextField } from '@mui/material'
import { FieldNames } from '../../../types/restaurantsAtom'
import { placeholders } from './EditRestaurantInfo'

interface EditGridSectionProps {
  label: string
  field: FieldNames
  editMode: { [key: string]: boolean }
  handleEdit: (field: FieldNames) => void
  handleCancel: (field: FieldNames) => void
  handleSave: (field: FieldNames) => void
  handleChange: (field: FieldNames, value: string) => void
  tempData: { [key: string]: any }
  shop: { [key: string]: any }
}

export const EditGridSection: React.FC<EditGridSectionProps> = ({
  label,
  field,
  editMode,
  handleEdit,
  handleCancel,
  handleSave,
  handleChange,
  tempData,
  shop,
}) => {
  return (
    <Grid container item xs={12} style={{ height: '10%' }}>
      <S.InfoGrid item xs={2.5}>
        <div>{label} :</div>
      </S.InfoGrid>
      <S.ValueGrid item xs={6.5}>
        {editMode[field] ? (
          <TextField
            value={tempData[field] !== undefined ? tempData[field] : shop[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={placeholders[field]}
          />
        ) : (
          shop[field]
        )}
      </S.ValueGrid>
      <S.ActionGrid item xs={3}>
        {editMode[field] ? (
          <>
            <S.ActionButton variant="contained" onClick={() => handleSave(field)}>
              저장
            </S.ActionButton>
            <S.ActionButton variant="contained" onClick={() => handleCancel(field)}>
              취소
            </S.ActionButton>
          </>
        ) : (
          <S.ActionButton variant="contained" onClick={() => handleEdit(field)}>
            수정
          </S.ActionButton>
        )}
      </S.ActionGrid>
    </Grid>
  )
}
