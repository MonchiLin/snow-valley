import { SnowVallyTheme } from '../constants/theme';
import { DEFAULT_SAFE_AREA_INSETS } from '../constants/safe-area';
import { createContext, useContext } from 'react';

export const SnowValleyContext = createContext({
  token: SnowVallyTheme.token,
  feature: SnowVallyTheme.feature,
  safeAreaInsets: DEFAULT_SAFE_AREA_INSETS,
});

export const useSnowValley = () => {
  return useContext(SnowValleyContext);
};
