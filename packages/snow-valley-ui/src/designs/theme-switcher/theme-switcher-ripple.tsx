import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Portal } from '@gorhom/portal';
import ReAnimated, { runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import type { ThemeSwitcherRippleProps, ThemeSwitcherRippleRef } from './theme-switcher.types';
import { Circle, Defs, Image, Mask, Svg } from 'react-native-svg';
import { useSnowValley } from '../../context/snow-valley.context';
// import { base64 as _bs64 } from './bs64.json';
const ReAnimatedCircle = ReAnimated.createAnimatedComponent(Circle);

export const ThemeSwitcherRipple = forwardRef<ThemeSwitcherRippleRef, ThemeSwitcherRippleProps>((props, ref) => {
  const windowDimensions = useWindowDimensions();
  const snowValley = useSnowValley();
  const [image, setImage] = useState('');
  const r = useSharedValue('0%');

  const onAnimationFinish = () => {
    r.value = '0%';
    setImage('');
    props.onAnimationFinish?.();
  };

  useImperativeHandle(ref, () => ({
    play: (imageURI) => {
      setImage(imageURI);
      r.value = withTiming('100%', { duration: 2000 }, () => {
        runOnJS(onAnimationFinish)();
      });
    },
  }));

  const animatedProps = useAnimatedProps(() => ({
    r: r.value,
  }));

  if (!image) {
    return null;
  }

  return (
    <Portal>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            width: windowDimensions.width,
            height: windowDimensions.height,
            top: snowValley.safeAreaInsets.top,
          },
        ]}
      >
        <Svg height={windowDimensions.height} width={windowDimensions.width}>
          <Defs>
            <Mask id="Mask" x="0" y="0" width="100%" height="100%">
              <ReAnimatedCircle cx="50%" cy="50%" animatedProps={animatedProps} fill="white" />
            </Mask>
          </Defs>
          <Image width="100%" height="100%" href={{ uri: image }} mask="url(#Mask)" />
        </Svg>
      </View>
    </Portal>
  );
});
