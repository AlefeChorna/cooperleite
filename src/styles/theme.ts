import { ThemeOptions, SimplePaletteColorOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

interface CustomThemePalette extends Omit<PaletteOptions, 'grey'> {
  grey?: SimplePaletteColorOptions;
  blue?: SimplePaletteColorOptions;
  purple?: SimplePaletteColorOptions;
  green?: SimplePaletteColorOptions;
  orange?: SimplePaletteColorOptions;
  red?: SimplePaletteColorOptions;
  black?: SimplePaletteColorOptions;
  rose?: SimplePaletteColorOptions;
}

export interface CustomThemeOptions extends Omit<ThemeOptions, 'palette'> {
  palette?: CustomThemePalette;
}

const blue: SimplePaletteColorOptions = {
  light: '#72FFFF',
  main: '#00FFFF',
  dark: '#00CBCC',
  contrastText: '#FFF',
};

const green: SimplePaletteColorOptions = {
  light: '#4ab46e',
  main: '#008342',
  dark: '#005519',
  contrastText: '#FFF',
};

const orange: SimplePaletteColorOptions = {
  light: '#ffc654',
  main: '#fd951f',
  dark: '#c46600',
  contrastText: '#FFF',
};

const red: SimplePaletteColorOptions = {
  light: '#fa8381',
  main: '#c35355',
  dark: '#8e232c',
  contrastText: '#FFF',
};

const rose: SimplePaletteColorOptions = {
  light: '#ff77fc',
  main: '#ff3bc9',
  dark: '#c80098',
  contrastText: '#FFF',
};

const grey: SimplePaletteColorOptions = {
  light: '#9E9D9D',
  main: '#706F6F',
  dark: '#454444',
  contrastText: '#FFF',
};

const purple: SimplePaletteColorOptions = {
  light: '#8a73ca',
  main: '#5a4799',
  dark: '#2a1f6a',
  contrastText: '#FFF',
};

const black: SimplePaletteColorOptions = {
  light: '#363538',
  main: '#100f12',
  dark: '#000000',
  contrastText: '#FFF',
};

const theme: CustomThemeOptions = {
  palette: {
    primary: orange,
    secondary: black,
    success: green,
    warning: orange,
    error: red,
    blue,
    purple,
    green,
    orange,
    red,
    black,
    grey,
    rose,
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        padding: 10,
        fontSize: '0.8rem',
      },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#FFF',
      },
      root: {
        height: 2,
      },
    },
  },
};

export default theme;
