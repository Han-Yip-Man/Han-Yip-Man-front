import React, { useState, useRef, KeyboardEvent } from 'react'
import { useRecoilState } from 'recoil'
import { focusState } from '../atoms/mainAtoms'

type KeyboardProps = {
  currentIndex: number
  ulRef: React.RefObject<HTMLUListElement>
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

type CallbackType = () => void

export default function useKeyboard(dataLength: number, callback: CallbackType): KeyboardProps {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const ulRef = useRef<HTMLUListElement>(null)
  const [isFocused, setIsFocused] = useRecoilState(focusState)

  const onFocus = () => {
    if (!isFocused) {
      setIsFocused(true)
      return
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (dataLength > 0) {
      switch (e.key) {
        case 'ArrowDown':
          setCurrentIndex(() => currentIndex + 1)
          if (ulRef.current?.childElementCount === currentIndex + 1) setCurrentIndex(() => 0)
          onFocus()
          break
        case 'ArrowUp':
          setCurrentIndex(() => currentIndex - 1)
          if (currentIndex <= 0) {
            setCurrentIndex(ulRef.current!.childElementCount - 1)
          }
          break
        case 'Enter':
          callback()
          setCurrentIndex(-1)
          break
      }
    }
  }

  if (ulRef.current && ulRef.current.children[currentIndex]) {
    ulRef.current.children[currentIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return { currentIndex, ulRef, handleKeyPress, setCurrentIndex }
}
