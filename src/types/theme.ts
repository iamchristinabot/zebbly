import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brand: {
      lightGray: string;
      mediumGray: string;
      darkGray: string;
      lightTeal: string;
      primary: string;
      secondary: string;
    }
  }
  
  interface PaletteOptions {
    brand: {
      lightGray: string;
      mediumGray: string;
      darkGray: string;
      lightTeal: string;
      primary: string;
      secondary: string;
    }
  }
}

export interface Theme extends MuiTheme {} 