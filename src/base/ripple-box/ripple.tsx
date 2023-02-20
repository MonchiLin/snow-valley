import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './ripple-box.style';
import type { RippleBoxConfig } from './ripple-box.types';
import { useEffect } from 'react';
import { Color } from '../../utilities/color';

interface Props extends Required<RippleBoxConfig> {
  pointAbsoluteX: number;
  pointAbsoluteY: number;
  referenceWidth: number;
  referenceHeight: number;
  onRippleEnd: () => void;
}

export function Ripple(props: Props) {
  const color = useSharedValue(Color.toRgba(props.color, 0.5));
  const scale = useSharedValue(0);
  const rippleAnimatedStyle = useAnimatedStyle(() => {
    const max = Math.max(props.referenceWidth, props.referenceHeight);

    return {
      transform: [{ scale: scale.value }],
      backgroundColor: color.value,
      left: props.pointAbsoluteX - max / 2,
      top: props.pointAbsoluteY - max / 2,
      width: max,
      height: max,
    };
  }, [props]);

  const RunOnJS = () => {
    props.onRippleEnd();
  };

  useEffect(() => {
    scale.value = withTiming(
      2,
      { duration: props.duration, easing: Easing.bezier(0, 0, 0.8, 0.4) },
      () => {
        runOnJS(RunOnJS)();
      }
    );
    color.value = withTiming(Color.toRgba(props.color, 0), {
      easing: Easing.bezier(0, 0, 0.8, 0.4),
      duration: props.duration,
    });
  }, []);

  return <Animated.View style={[rippleAnimatedStyle, styles.ripple]} />;
}
