import { SnowVallyTheme } from '../theme';
import { useMemo, useState } from 'react';
import { SnowValleyContext } from './snow-valley.context';
import { DEFAULT_SAFE_AREA_INSETS } from '../constants/safe-area';
import type { SnowValleyProps } from './snow-valley.types';

export const LonelySnowValley = ({ isDarkMode = false, ...props }: SnowValleyProps) => {
  const [tokens] = useState(SnowVallyTheme.token);
  const [feature] = useState(SnowVallyTheme.componentToken);
  const safeAreaInsets = useMemo(() => {
    return Object.assign(DEFAULT_SAFE_AREA_INSETS, props.safeAreaInsets);
  }, [props.safeAreaInsets]);

  // 因为主题定义中有些变量是需要动态替换的，所以这里需要做一次替换
  // 具体参考 src/theme.ts 中的 SnowVallyTheme.replaceComponentVariable 方法
  const _feature = useMemo(() => {
    return SnowVallyTheme.replaceComponentVariable(feature, tokens, isDarkMode);
  }, [tokens, feature, isDarkMode]);

  return (
    <SnowValleyContext.Provider
      value={{
        tokens: tokens,
        componentTokens: _feature,
        safeAreaInsets: safeAreaInsets,
        isDarkMode: isDarkMode,
      }}
    >
      {props.children}
    </SnowValleyContext.Provider>
  );
};
