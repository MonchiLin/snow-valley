import { SnowVallyTheme, SnowVallyThemeStatic } from '../theme';
import { DEFAULT_SAFE_AREA_INSETS } from '../constants/safe-area';
import { createContext, useContext, useMemo } from 'react';

export const SnowValleyContext = createContext({
  tokens: SnowVallyTheme.token,
  componentTokens: SnowVallyTheme.componentToken,
  safeAreaInsets: DEFAULT_SAFE_AREA_INSETS,
  isDarkMode: false,
  toggleTheme: (_?: boolean) => null,
});

export const useSnowValley = () => {
  return useContext(SnowValleyContext);
};

export const useSnowValleyTokens = (): SnowVallyThemeStatic.TokenPlain => {
  const context = useContext(SnowValleyContext);

  return useMemo(() => {
    return Object.entries(context.tokens).reduce((acc, [key, platte]) => {
      return {
        ...acc,
        [key]: platte[context.isDarkMode ? 'dark' : 'light'],
      };
    }, {} as SnowVallyThemeStatic.TokenPlain);
  }, [context.tokens, context.isDarkMode]);
};
