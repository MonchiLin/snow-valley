export declare namespace SnowVallyThemeStatic {
  export type Token = {
    textPrimaryColor: string;
    textNormalColor: string;
    borderFocusColor: string;
    borderNormalColor: string;
    backgroundPrimaryColor: string;
    backgroundDisabledColor: string;
  };

  type ColorValue = keyof Token;

  export type Feature = {
    FloatingInput: {
      focused: {
        labelColor: string;
        borderColor: string;
      };
      unFocused: {
        labelColor: string;
        borderColor: string;
      };
    };
    Toast: {
      zIndex: number;
      duration: number;
      maxCount: null | number;
    };
    Switch: {
      unCheckedBackgroundColor: string;
      checkedBackgroundColor: string;
      handler: {
        unCheckedBackgroundColor: string;
        checkedBackgroundColor: string;
        unCheckedBorderColor: string;
        checkedBorderColor: string;
      };
    };
  };
}
