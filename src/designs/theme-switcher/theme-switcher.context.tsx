import { createContext, useContext } from 'react';
import type { ThemeSwitcherContextType } from './theme-switcher.types';

export const ThemeSwitcherContext = createContext<ThemeSwitcherContextType>({
  toggleTheme: () => {},
});

export const useThemeSwitcher = () => {
  return useContext(ThemeSwitcherContext);
};
