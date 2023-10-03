import { VariantType, useSnackbar } from 'notistack'
import { ReactNode } from 'react'

interface Styles<T = any> {
  [key: string]: T
}

type horizontalType = 'right' | 'center' | 'left'
type verticalType = 'bottom' | 'top'

type AnchorOriginType = {
  horizontal: horizontalType
  vertical: verticalType
}

export type Args<T, C extends ReactNode> = [C, number, VariantType, AnchorOriginType?, Styles<T>?]

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar()

  const handleAlert = <T, C extends ReactNode>(
    msg: C,
    hideDuration: number,
    variant: VariantType,
    anchorOrigin?: AnchorOriginType,
    style?: Styles<T>,
  ) => {
    enqueueSnackbar(msg, {
      variant,
      anchorOrigin: anchorOrigin || { horizontal: 'right', vertical: 'bottom' },
      autoHideDuration: hideDuration,
      style,
    })
  }

  return handleAlert
}

export default useAlert
