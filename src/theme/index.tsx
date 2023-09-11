import { ReactNode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

const theme: DefaultTheme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: 'rgba(255, 255, 255, 0.87)',
    background: '#24242',
    primary: '#30ca3f',
    secondary: '#8992ec',
    black: '#000000',
    white: '#ffffff',
    gray1: '#e6f7ff',
    gray2: '#999999',
    gray3: '#888888',
    gray4: '#666666',
    gray5: '#3a3a3a',
    gray6: '#383838',
    gray7: '#333333',
    gray8: '#1e1e1e',
    gray9: '#121212',
  },
};

function Theme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
