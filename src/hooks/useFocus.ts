import { useRecoilState } from 'recoil'
import { focusState } from '../atoms/mainAtoms'

const useFocus = () => {
  const [isFocused, setIsFocused] = useRecoilState(focusState)

  const onFocus = () => {
    setIsFocused(true)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  return { isFocused, setIsFocused, onFocus, onBlur }
}

export default useFocus
