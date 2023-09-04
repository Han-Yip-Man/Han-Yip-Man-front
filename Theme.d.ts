declare module '@mui/material/styles' {
  interface ButtonPropsColorOverrides {
    custom: true
  }

  interface Palette {
    custom: Palette['primary']
  }
  interface PaletteOptions {
    custom?: PaletteOptions['palette']
  }
  export function createTheme(options: PaletteOptions): Palette
}

export {}
