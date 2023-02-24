import { createContext, useContext } from 'react';
import type { ThemeSwitcherContextType } from './theme-switcher-ripple.types';

export const ThemeSwitcherRippleContext = createContext<ThemeSwitcherContextType>({
  toggleTheme: () => {},
});

export const useThemeSwitcherRipple = () => {
  return useContext(ThemeSwitcherRippleContext);
};
