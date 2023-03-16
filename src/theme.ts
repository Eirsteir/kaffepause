import { ThemeOptions, createTheme } from '@mui/material/styles';
import "@fontsource/raleway"
import "@fontsource/raleway/900.css";

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#9DC0BC',
    },
    primary: {
      main: '#264653',
    },
    secondary: {
      main: '#e9c46aff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#9DC0BC'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    allVariants: {
      color: '#264653',
    },
    h1: {
      fontWeight: 800,
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
    h5: {
      fontWeight: 600
    },
    button: {
      fontWeigth: 700,
    }
  },
};

export const theme = createTheme(themeOptions);