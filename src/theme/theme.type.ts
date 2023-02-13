export declare namespace SnowVallyThemeStatic {
  interface PaletteColor {
    light: string;
    dark: string;
  }

  export type Token = {
    textPrimaryColor: PaletteColor;
    textNormalColor: PaletteColor;
    borderFocusColor: PaletteColor;
    borderNormalColor: PaletteColor;
    backgroundPrimaryColor: PaletteColor;
    backgroundDisabledColor: PaletteColor;
  };
  type WithDollar = { [key in keyof Token]: `$${key}` };
  type ColorValue = WithDollar[keyof WithDollar] | string;

  export type ComponentToken = {
    FloatingInput: {
      focused: {
        labelColor: ColorValue;
        borderColor: ColorValue;
      };
      unFocused: {
        labelColor: ColorValue;
        borderColor: ColorValue;
      };
    };
    Toast: {
      zIndex: number;
      duration: number;
      maxCount: null | number;
    };
    Switch: {
      unCheckedBackgroundColor: ColorValue;
      checkedBackgroundColor: ColorValue;
      handler: {
        unCheckedBackgroundColor: ColorValue;
        checkedBackgroundColor: ColorValue;
        unCheckedBorderColor: ColorValue;
        checkedBorderColor: ColorValue;
      };
    };
  };
}
