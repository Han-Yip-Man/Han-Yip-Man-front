import { VariantType, useSnackbar } from 'notistack'
import { ReactNode } from 'react'

interface Styles<T = any> {
  [key: string]: T
}

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar()

  const handleAlert = <T, C extends ReactNode>(
    msg: C,
    hideDuration: number,
    variant: VariantType,
    style?: Styles<T>,
  ) => {
    enqueueSnackbar(msg, {
      variant,
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      autoHideDuration: hideDuration,
      style,
    })
  }

  return handleAlert
}

export default useAlert
