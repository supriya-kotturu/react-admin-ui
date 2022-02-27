import { createTheme, ThemeProvider } from '@mui/material';
import { ReactChild } from 'react';
import { green, red, teal } from '@mui/material/colors';

interface RootThemeProps {
	children?: ReactChild;
}

const theme = createTheme({
	palette: {
		primary: {
			main: teal.A700,
		},
		error: {
			main: red['A100'],
		},
	},
});

export const RootTheme = ({ children }: RootThemeProps): JSX.Element => {
	return <ThemeProvider theme={theme}> {children}</ThemeProvider>;
};
