export const DEFAULT_TOKEN = {
  textPrimaryColor: '#64A0E8',
  textNormalColor: '#A8A8A8',
  borderFocusColor: '#DBDBDB',
  borderNormalColor: '#64A0E8',
};

export const DEFAULT_COMPONENT = {
  FloatingInput: {
    focused: {
      labelColor: '$textPrimaryColor',
      borderColor: '$borderFocusColor',
    },
    unFocused: {
      labelColor: '$textNormalColor',
      borderColor: '$borderNormalColor',
    },
  },
  Toast: {
    zIndex: 1000,
    duration: 3000,
    maxCount: null as null | number,
  },
};

// 将 DEFAULT_COMPONENT 中 $ 开头的属性替换为 DEFAULT_TOKEN 中对应的属性
export const replaceComponentVariable = (
  component: typeof DEFAULT_COMPONENT,
  token: typeof DEFAULT_TOKEN
) => {
  const replace = (obj: any) => {
    // 如果是 null 或者 undefined
    if (!obj) {
      return;
    }
    Object.keys(obj).forEach((key: any) => {
      if (typeof obj[key] === 'string' && obj[key].startsWith('$')) {
        // @ts-ignore
        const tokenValue = token[obj[key].slice(1)];
        if (!tokenValue) {
          throw new Error(`Token ${obj[key].slice(1)} not found`);
        }
        obj[key] = tokenValue;
      } else if (typeof obj[key] === 'object') {
        replace(obj[key]);
      }
    });
  };

  replace(component);
  return component;
};
