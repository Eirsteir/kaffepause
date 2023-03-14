import { ThemeOptions, createTheme } from '@mui/material/styles';
import "@fontsource/raleway"

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#9DC0BC',
    },
    secondary: {
      main: '#264653',
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700
    },
    h4: {
      fontWeight: 600
    },
    button: {
      fontWeigth: 700,
    }
  },
};

export const theme = createTheme(themeOptions);