import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import * as S from './Radio.Styles'

export default function SideDishTwoRadio() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">토핑 선택</FormLabel>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="none" name="radio-buttons-group">
        <S.RadioWrapperDiv>
          <FormControlLabel value="none" control={<Radio />} label="선택 안함" />
          <S.ItemPriceDiv></S.ItemPriceDiv>
        </S.RadioWrapperDiv>
        <S.RadioWrapperDiv>
          <FormControlLabel value="cheeze" control={<Radio />} label="치즈 추가" />
          <S.ItemPriceDiv>+1,000원</S.ItemPriceDiv>
        </S.RadioWrapperDiv>
        <S.RadioWrapperDiv>
          <FormControlLabel value="sausage" control={<Radio />} label="소시지 추가" />
          <S.ItemPriceDiv>+2,000원</S.ItemPriceDiv>
        </S.RadioWrapperDiv>
        <S.RadioWrapperDiv>
          <FormControlLabel value="shrimp" control={<Radio />} label="새우 추가" />
          <S.ItemPriceDiv>+4,000원</S.ItemPriceDiv>
        </S.RadioWrapperDiv>
      </RadioGroup>
    </FormControl>
  )
}
