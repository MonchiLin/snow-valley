import { merge } from 'lodash-es';
import type { SnowVallyThemeStatic } from './theme.type';
import type { DeepPartial } from '../shared-types';

export namespace SnowVallyTheme {
  export const token: SnowVallyThemeStatic.Token = {
    textPrimaryColor: {
      light: '#64A0E8',
      dark: '#64A0E8',
    },
    textNormalColor: {
      light: '#A8A8A8',
      dark: '#A8A8A8',
    },
    borderFocusColor: {
      light: '#64A0E8',
      dark: '#64A0E8',
    },
    borderNormalColor: {
      light: '#DBDBDB',
      dark: '#DBDBDB',
    },
    backgroundPrimaryColor: {
      light: '#ffffff',
      dark: '#000000',
    },
    backgroundDisabledColor: {
      light: '#b0b5b9',
      dark: '#b0b5b9',
    },
  };

  export const injectAToken = (anyObject: DeepPartial<SnowVallyThemeStatic.Token>) => {
    merge(token, anyObject);
    replaceComponentVariable(componentToken, token);
    return token;
  };

  export const componentToken: SnowVallyThemeStatic.ComponentToken = {} as any;

  export const injectAComponentToken = (
    anyObject: DeepPartial<SnowVallyThemeStatic.ComponentToken>
  ) => {
    merge(componentToken, anyObject);
    replaceComponentVariable(componentToken, token);
    return componentToken;
  };

  /**
   * 将 DEFAULT_COMPONENT 中 $ 开头的属性替换为 DEFAULT_TOKEN 中对应的属性
   * @param _componentTokens
   * @param _tokens
   * @param isDarkMode
   */
  export const replaceComponentVariable = (
    _componentTokens: SnowVallyThemeStatic.ComponentToken,
    _tokens: SnowVallyThemeStatic.Token,
    isDarkMode = false
  ) => {
    const replace = (obj: any) => {
      // 如果是 null 或者 undefined
      if (!obj) {
        return;
      }
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('$')) {
          // @ts-ignore
          const tokenValue: SnowVallyThemeStatic.PaletteColor = _tokens[value.slice(1)];
          if (!tokenValue) {
            throw new Error(`Token ${value.slice(1)} not found`);
          }
          obj[key] = tokenValue[isDarkMode ? 'dark' : 'light'];
        } else if (typeof value === 'object') {
          replace(value);
        }
      });
    };

    replace(_componentTokens);
    return _componentTokens;
  };
}
