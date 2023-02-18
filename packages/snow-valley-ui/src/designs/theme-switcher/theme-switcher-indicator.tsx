import type { ThemeSwitcherIndicatorProps } from './theme-switcher.types';
import { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import styles from './theme-switcher.style';

// https://lottiefiles.com/32532-day-night
export const ThemeSwitcherIndicator = (props: ThemeSwitcherIndicatorProps) => {
  const animationRef = useRef<LottieView | null>(null);
  const isFirstAnimation = useRef({
    start: true,
    finish: true,
  });

  useEffect(() => {
    if (props.isNight) {
      animationRef.current?.play(0, 60);
    } else {
      animationRef.current?.play(60, 0);
    }
    if (isFirstAnimation.current.start) {
      isFirstAnimation.current.start = false;
    } else {
      props.onAnimationStart?.(props.isNight);
    }
  }, [props.isNight]);

  const onAnimationFinish = (isCancelled: boolean) => {
    if (!isCancelled) {
      return;
    }
    if (isFirstAnimation.current.finish) {
      isFirstAnimation.current.finish = false;
    } else {
      props.onAnimationFinish?.(props.isNight);
    }
  };

  return (
    <LottieView
      duration={2000}
      ref={animationRef}
      onAnimationFinish={onAnimationFinish}
      autoPlay={false}
      loop={false}
      style={styles.ThemeSwitcherIndicator}
      source={require('./day-night.json')}
    />
  );
};
