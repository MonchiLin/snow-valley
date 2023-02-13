import { SnowVallyTheme } from '../theme';
import { DEFAULT_SAFE_AREA_INSETS } from '../constants/safe-area';
import { createContext, useContext } from 'react';

export const SnowValleyContext = createContext({
  tokens: SnowVallyTheme.token,
  componentTokens: SnowVallyTheme.componentToken,
  safeAreaInsets: DEFAULT_SAFE_AREA_INSETS,
  isDarkMode: false,
});

export const useSnowValley = () => {
  return useContext(SnowValleyContext);
};
