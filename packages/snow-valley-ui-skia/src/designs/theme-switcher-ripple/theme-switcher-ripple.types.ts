import type { ViewStyle } from 'react-native';

export interface ThemeSwitcherProviderProps {
  style?: ViewStyle;
}

export interface ThemeSwitcherContextType {
  toggleTheme: (newState?: boolean) => void;
}

export interface ThemeSwitcherRippleProps {
  // 是否倒放
  reverse: boolean;
  onAnimationFinish: () => void;
}

export interface ThemeSwitcherRippleRef {
  play: (imageURI: string) => void;
}
