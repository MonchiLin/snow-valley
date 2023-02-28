import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { ThemeSwitcherRippleContext } from './theme-switcher-ripple.context';
import ViewShot from 'react-native-view-shot';
import type { ThemeSwitcherProviderProps, ThemeSwitcherRippleRef } from './theme-switcher-ripple.types';
import { useSnowValley } from 'snow-valley-ui';
import { ThemeSwitcherRipple } from './theme-switcher-ripple';

export const ThemeSwitcherRippleProvider = (props: PropsWithChildren<ThemeSwitcherProviderProps>) => {
  const snowValley = useSnowValley();
  const rippleRef = useRef<ThemeSwitcherRippleRef | null>(null);
  const viewShotRef = useRef<ViewShot | null>(null);

  const toggleTheme = async (newState?: boolean) => {
    const file = await viewShotRef.current?.capture!();
    rippleRef.current?.play(file!);
    snowValley.toggleTheme(newState);
  };

  const onAnimationFinish = async () => {};

  return (
    <>
      <ThemeSwitcherRippleContext.Provider value={{ toggleTheme }}>
        <ViewShot style={{ flex: 1 }} options={{ format: 'png', result: 'base64' }} ref={viewShotRef}>
          {props.children}
        </ViewShot>
      </ThemeSwitcherRippleContext.Provider>

      <ThemeSwitcherRipple onAnimationFinish={onAnimationFinish} reverse={snowValley.isDarkMode} ref={rippleRef} />
    </>
  );
};
