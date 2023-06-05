import { createTheme, ThemeOptions } from '@mui/material/styles';

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
    borderRadius: 8,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#264653',
    },
    secondary: {
      main: '#e76f51ff',
    },
    border: {
      main: '#DDD',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#FFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    allVariants: {
      color: '#264653',
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.375rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
  },
};

export const theme = createTheme(themeOptions);
