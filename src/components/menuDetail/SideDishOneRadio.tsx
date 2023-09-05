import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import * as S from './Radio.Styles'

export default function SideDishOneRadio() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">엣지 선택</FormLabel>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="none" name="radio-buttons-group">
        <S.RadioWrapperDiv>
          <FormControlLabel value="none" control={<Radio />} label="선택 안함" />
          <S.ItemPriceDiv></S.ItemPriceDiv>
        </S.RadioWrapperDiv>
        <S.RadioWrapperDiv>
          <FormControlLabel value="double" control={<Radio />} label="더블 치즈 엣지" />
          <S.ItemPriceDiv>+3,000원</S.ItemPriceDiv>
        </S.RadioWrapperDiv>
        <S.RadioWrapperDiv>
          <FormControlLabel value="triple" control={<Radio />} label="트리플 치즈 버스트 엣지" />
          <S.ItemPriceDiv>+4,000원</S.ItemPriceDiv>
        </S.RadioWrapperDiv>
        <S.RadioWrapperDiv>
          <FormControlLabel value="pepperoni" control={<Radio />} label="더블 치즈 페퍼로니 엣지" />
          <S.ItemPriceDiv>+5,000원</S.ItemPriceDiv>
        </S.RadioWrapperDiv>
      </RadioGroup>
    </FormControl>
  )
}
