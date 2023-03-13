import { ThemeOptions, createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#9DC0BC',
    },
    secondary: {
      main: '#E9D8A6',
    },
  },
};

export const theme = createTheme(themeOptions);