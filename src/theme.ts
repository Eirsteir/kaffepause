import { createTheme, ThemeOptions } from '@mui/material/styles';
import '@fontsource/raleway';
import '@fontsource/raleway/900.css';
import '@fontsource/raleway/500.css';

declare module '@mui/material/styles' {
  interface Palette {
    border: Palette['primary'];
  }

  interface PaletteOptions {
    border: PaletteOptions['primary'];
  }
}

const themeOptions: ThemeOptions = {
  shape: {
    borderRadius: 21,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#264653',
    },
    secondary: {
      main: '#f8e7e4',
    },
    border: {
      main: '#DDD',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    allVariants: {
      color: '#264653',
    },
  },
};

export const theme = createTheme(themeOptions);
