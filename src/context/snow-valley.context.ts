import { DEFAULT_COMPONENT, DEFAULT_TOKEN } from '../constants/theme';
import { DEFAULT_SAFE_AREA_INSETS } from '../constants/safe-area';
import { createContext, useContext } from 'react';

export const SnowValleyContext = createContext({
  token: DEFAULT_TOKEN,
  component: DEFAULT_COMPONENT,
  safeAreaInsets: DEFAULT_SAFE_AREA_INSETS,
});

export const useSnowValley = () => {
  return useContext(SnowValleyContext);
};
