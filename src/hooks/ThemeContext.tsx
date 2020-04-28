import React from 'react';
import {
  ThemeProvider as MUIThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import themeStyle, { CustomThemeOptions } from '../styles/theme';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const customTheme: CustomThemeOptions = createMuiTheme(themeStyle);

export const ThemeProvider: React.FC = ({ children }) => {
  return <MUIThemeProvider theme={customTheme}>{children}</MUIThemeProvider>;
};
