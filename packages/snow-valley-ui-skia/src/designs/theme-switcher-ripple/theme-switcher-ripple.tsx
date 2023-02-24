import { StyleSheet, useWindowDimensions } from 'react-native';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Portal } from '@gorhom/portal';
import type { ThemeSwitcherRippleProps, ThemeSwitcherRippleRef } from './theme-switcher-ripple.types';
import { Canvas, Circle, Image, Mask, runTiming, Skia, SkImage, useValue } from '@shopify/react-native-skia';

export const ThemeSwitcherRipple = forwardRef<ThemeSwitcherRippleRef, ThemeSwitcherRippleProps>((props, ref) => {
  const [image, setImage] = useState('');
  const radius = useValue(200);
  const windowDimensions = useWindowDimensions();
  const skImage = useRef<SkImage | null>(null);

  useImperativeHandle(ref, () => ({
    play: (imageURI) => {
      skImage.current = Skia.Image.MakeImageFromEncoded(Skia.Data.fromBase64(imageURI));
      setImage(imageURI);
      runTiming(
        radius,
        {
          from: 0,
          to: 1000,
        },
        {
          duration: 6000,
        },
        () => {
          setImage('');
          skImage.current = null;
        }
      );
    },
  }));

  if (!image) {
    return null;
  }

  return (
    <Portal>
      <Canvas
        style={[
          StyleSheet.absoluteFillObject,
          {
            width: windowDimensions.width,
            height: windowDimensions.height,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Mask mask={<Circle cx={windowDimensions.width / 2} cy={windowDimensions.height / 2} r={radius} />}>
          {/*<Rect x={0} y={0} width={windowDimensions.width} height={windowDimensions.height} color="red" />*/}
          <Image width={windowDimensions.width} height={windowDimensions.height} image={skImage.current!} />
        </Mask>
      </Canvas>
    </Portal>
  );
});
