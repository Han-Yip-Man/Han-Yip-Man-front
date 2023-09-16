declare module '@mui/material/styles' {
  interface ButtonPropsColorOverrides {
    custom: true
  }

  interface PaletteColorOptions {
    main: string
    secondary: string
  }

  interface Palette {
    custom: PaletteColorOptions
  }

  interface PaletteOptions {
    custom?: PaletteColorOptions
  }
  export function createTheme(options: PaletteOptions): Palette
}

export {}
