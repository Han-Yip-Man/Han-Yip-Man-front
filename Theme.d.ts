declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }

  interface Palette {
    rg: Palette['primary']
  }
  interface PaletteOptions {
    rg: PaletteOptions['palette']
  }
  export function createTheme(options: ThemeOptions): Theme
}
