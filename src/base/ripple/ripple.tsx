import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { HandlerStateChangeEvent } from 'react-native-gesture-handler';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import type { Bounds, ValueOf } from '../../shared-types';
import { LayoutChangeEvent, View } from 'react-native';
import styles from './ripple.style';
import { useRef, useState } from 'react';
import type { RippleProps } from './ripple.types';

const startColor = 'rgba(0, 0, 0, 0.54)';
const endColor = 'rgba(0, 0, 0, 0)';

export const Ripple = (props: RippleProps) => {
  const scale = useSharedValue(0);
  const [bounds, setBounds] = useState<Bounds>({ x: 0, y: 0, w: 0, h: 0 });
  const bgColor = useSharedValue(startColor);
  const state = useRef<ValueOf<typeof State>>(State.UNDETERMINED);
  const effect = useRef({
    // 是否是长按
    isLongPress: false,
    longPressTimer: null as any,
    longPressReached: false,
    longPressCallback: () => {
      setTimeout(() => {
        effect.current.isLongPress = false;
        bgColor.value = endColor;
        scale.value = 0;
        effect.current.isAnimating = false;
      }, 600);
    },
    // 是否在执行动画
    isAnimating: false,
  });

  const rippleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: bgColor.value,
      left: bounds.x,
      top: bounds.y,
      width: bounds.w,
      height: bounds.h,
    };
  }, [bounds, scale, bgColor]);

  const handleLongPress = () => {
    effect.current.longPressTimer = setTimeout(() => {
      effect.current.isLongPress = true;
      effect.current.isAnimating = true;
      bgColor.value = withTiming(startColor, {
        duration: 400,
        easing: Easing.bounce,
      });
      scale.value = withTiming(1.8, { duration: 600 }, () => {});
    }, 500);
  };

  const handlePress = () => {
    if (effect.current.isLongPress) {
      return;
    } else {
      clearTimeout(effect.current.longPressTimer);
      bgColor.value = withTiming(startColor, {
        duration: 400,
        easing: Easing.bounce,
      });
      scale.value = withTiming(1.8, { duration: 600 }, () => {
        bgColor.value = endColor;
        scale.value = 0;
        effect.current.isAnimating = false;
      });
    }
  };

  const onHandlerStateChange = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
    console.log('onHandlerStateChange', event.nativeEvent.state);
    props.onPress?.(event);
    state.current = event.nativeEvent.state;
    if (effect.current.isAnimating) {
      return;
    }
    if (state.current === State.BEGAN) {
      const x = event.nativeEvent.x;
      const y = event.nativeEvent.y;
      setBounds((_) => {
        return {
          ..._,
          x: x - bounds.w! / 2,
          y: y - bounds.h! / 2,
        };
      });
      handleLongPress();
    } else if (state.current === State.ACTIVE) {
      handlePress();
    } else if (state.current === State.END || state.current === State.FAILED) {
      if (effect.current.isLongPress) {
        effect.current.longPressCallback();
      }
    }
  };

  const onViewLayout = (event: LayoutChangeEvent) => {
    setBounds((_) => {
      return {
        ..._,
        w: event.nativeEvent.layout.width,
        h: event.nativeEvent.layout.height,
      };
    });
  };

  return (
    <TapGestureHandler maxDurationMs={9999999999} onHandlerStateChange={onHandlerStateChange}>
      <View onLayout={onViewLayout} style={[styles.container]}>
        <Animated.View style={[rippleAnimatedStyle, styles.ripple]} />
        {props.children}
      </View>
    </TapGestureHandler>
  );
};
