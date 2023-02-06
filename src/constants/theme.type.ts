export declare namespace SnowVallyThemeStatic {
  export type Token = {
    textPrimaryColor: string;
    textNormalColor: string;
    borderFocusColor: string;
    borderNormalColor: string;
  };

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
  };
}
