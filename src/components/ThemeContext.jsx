// theme-context.ts
import { createContext } from 'react';
export const ThemeContext = createContext({
  theme: '',
  setTheme: (theme) => {},
});

export const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

export const getDefaultTheme = () => {
  const localStorageTheme = localStorage.getItem('theme');
  const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
  return localStorageTheme || browserDefault;
};
