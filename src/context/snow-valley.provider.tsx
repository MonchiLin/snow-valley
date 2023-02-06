import { SnowVallyTheme } from '../constants/theme';
import { ReactNode, useMemo, useState } from 'react';
import { SnowValleyContext } from './snow-valley.context';
import { ToastProvider } from '../base/toast/toast.provider';
import { DEFAULT_SAFE_AREA_INSETS } from '../constants/safe-area';

type SnowValleyProps = {
  children: ReactNode;
  safeAreaInsets?: typeof DEFAULT_SAFE_AREA_INSETS;
};

export const SnowValley = (props: SnowValleyProps) => {
  const [token] = useState(SnowVallyTheme.token);
  const [feature] = useState(SnowVallyTheme.feature);
  const safeAreaInsets = useMemo(() => {
    return Object.assign(DEFAULT_SAFE_AREA_INSETS, props.safeAreaInsets);
  }, [props.safeAreaInsets]);

  // 因为主题定义中有些变量是需要动态替换的，所以这里需要做一次替换
  // 具体参考 src/constants/theme.tsx
  const _feature = useMemo(() => {
    return SnowVallyTheme.replaceComponentVariable(feature, token);
  }, [token, feature]);

  return (
    <SnowValleyContext.Provider
      value={{ token: token, feature: _feature, safeAreaInsets: safeAreaInsets }}
    >
      <ToastProvider>{props.children}</ToastProvider>
    </SnowValleyContext.Provider>
  );
};
