import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { ThemeSwitcherContext } from './theme-switcher.context';
import ViewShot from 'react-native-view-shot';
import type { ThemeSwitcherProviderProps, ThemeSwitcherRippleRef } from './theme-switcher.types';
import { useSnowValley } from '../../context/snow-valley.context';
import { ThemeSwitcherRipple } from './theme-switcher-ripple';

export const ThemeSwitcherProvider = (props: PropsWithChildren<ThemeSwitcherProviderProps>) => {
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
      <ThemeSwitcherContext.Provider value={{ toggleTheme }}>
        <ViewShot style={{ flex: 1 }} options={{ format: 'png', result: 'tmpfile' }} ref={viewShotRef}>
          {props.children}
        </ViewShot>
      </ThemeSwitcherContext.Provider>

      <ThemeSwitcherRipple onAnimationFinish={onAnimationFinish} reverse={snowValley.isDarkMode} ref={rippleRef} />
    </>
  );
};
