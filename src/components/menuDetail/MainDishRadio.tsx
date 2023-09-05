import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import * as S from './Radio.Styles'

export default function MainDishRadio() {
  // $("input:radio[name='menu']:radio[value='pasta']").prop('checked', true);
  // $("input:radio[name='fruits']:radio[value='사과']").prop('checked', false); // 해제하기

  return (
    //     <fieldset>
    //   <legend>메뉴 선택</legend>

    //   <div>
    //     <label htmlFor="huey">
    //       <input type="radio" id="pizza" name="menu" value="pizza" checked />
    //       Pizza
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="pasta">
    //       <input type="radio" id="pasta" name="menu" value="pasta" />
    //       Pasta
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="risotto">
    //       <input type="radio" id="risotto" name="menu" value="risotto" />
    //       Risotto
    //     </label>
    //   </div>
    // </fieldset>

    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">도우 선택</FormLabel>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="original" name="radio-buttons-group">
        <S.RadioWrapperDiv>
          <FormControlLabel value="original" control={<Radio />} label="오리지널 도우" />
          <S.ItemPriceDiv></S.ItemPriceDiv>
        </S.RadioWrapperDiv>
        <S.RadioWrapperDiv>
          <FormControlLabel value="napoli" control={<Radio />} label="나폴리 도우" />
          <S.ItemPriceDiv>+2,000원</S.ItemPriceDiv>
        </S.RadioWrapperDiv>
        <S.RadioWrapperDiv>
          <FormControlLabel value="thin" control={<Radio />} label="씬 도우" />
          <S.ItemPriceDiv>+3,000원</S.ItemPriceDiv>
        </S.RadioWrapperDiv>
      </RadioGroup>
    </FormControl>
  )
}

// <label><input type="radio" name="fruits" value="사과">사과</label>
// <label><input type="radio" name="fruits" value="복숭아">복숭아</label>

// Javascript
// $("input:radio[name='fruits']:radio[value='사과']").prop('checked', true); // 선택하기
// $("input:radio[name='fruits']:radio[value='사과']").prop('checked', false); // 해제하기
