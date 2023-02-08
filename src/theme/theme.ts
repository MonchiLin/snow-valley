import { merge } from 'lodash-es';
import type { SnowVallyThemeStatic } from './theme.type';
import type { DeepPartial } from '../shared-types';

export namespace SnowVallyTheme {
  export const token: SnowVallyThemeStatic.Token = {
    textPrimaryColor: '#64A0E8',
    textNormalColor: '#A8A8A8',
    borderFocusColor: '#64A0E8',
    borderNormalColor: '#DBDBDB',
    backgroundPrimaryColor: '#53ade9',
    backgroundDisabledColor: '#b0b5b9',
  };

  export const injectToken = (anyObject: DeepPartial<SnowVallyThemeStatic.Token>) => {
    merge(token, anyObject);
    updateFeatureVariable();
    return token;
  };

  export const feature: SnowVallyThemeStatic.Feature = {} as any;

  export const injectFeature = (anyObject: DeepPartial<SnowVallyThemeStatic.Feature>) => {
    merge(feature, anyObject);
    updateFeatureVariable();
    return feature;
  };

  export const updateFeatureVariable = () => {
    return replaceComponentVariable(feature, token);
  };

  /**
   * 将 DEFAULT_COMPONENT 中 $ 开头的属性替换为 DEFAULT_TOKEN 中对应的属性
   * @param _feature
   * @param _token
   */
  export const replaceComponentVariable = (
    _feature: SnowVallyThemeStatic.Feature,
    _token: SnowVallyThemeStatic.Token
  ) => {
    const replace = (obj: any) => {
      // 如果是 null 或者 undefined
      if (!obj) {
        return;
      }
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('$')) {
          // @ts-ignore
          const tokenValue = _token[value.slice(1)];
          if (!tokenValue) {
            throw new Error(`Token ${value.slice(1)} not found`);
          }
          obj[key] = tokenValue;
        } else if (typeof value === 'object') {
          replace(value);
        }
      });
    };

    replace(_feature);
    return _feature;
  };
}
