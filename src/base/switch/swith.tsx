import {
  GestureResponderEvent,
  ImageStyle,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import SwitchStyles from './swith.styles';
import type { SwitchProps } from './swith.types';
import Animated, { AnimatedStyleProp, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useLayoutEffect, useRef, useState } from 'react';
import type { Bounds } from '../../shared-types';

export const Switch = (props: SwitchProps) => {
  const viewRef = useRef<View>(null);
  const viewBounds = useRef<Required<Bounds>>({
    x: 0,
    y: 0,
    w: 44,
    h: 0,
  });

  const handlerBounds = useRef<Required<Bounds>>({
    x: 0,
    y: 0,
    w: 20,
    h: 0,
  });

  useLayoutEffect(() => {
    viewRef.current!.measure((x: number, y: number, width: number, height: number) => {
      viewBounds.current = {
        x,
        y,
        w: width,
        h: height,
      };
    });
  }, []);

  const onChange = (event: GestureResponderEvent) => {
    setChecked(!checked);
    props.onChange?.(!checked, event);
  };
  const [checked, setChecked] = useState(false);

  const handlerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(
            checked
              ? -handlerBounds.current.w / 2
              : viewBounds.current.w + -handlerBounds.current.w * 1.5
          ),
        },
      ],
    } as AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>;
  }, [checked]);

  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <View ref={viewRef} style={SwitchStyles.switch}>
        <Animated.View style={[SwitchStyles.inner]} />
        <Animated.View style={[SwitchStyles.handler, handlerStyle]} />
      </View>
    </TouchableWithoutFeedback>
  );
};
