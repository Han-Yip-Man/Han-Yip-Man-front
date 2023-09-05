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
    jeein: PaletteColorOptions
  }

  interface PaletteOptions {
    custom?: PaletteColorOptions
    jeein?: PaletteColorOptions
  }
  export function createTheme(options: PaletteOptions): Palette
}

export {}
