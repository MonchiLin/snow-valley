import {
  GestureResponderEvent,
  ImageStyle,
  LayoutChangeEvent,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import SwitchStyles from './swith.styles';
import type { SwitchProps } from './swith.types';
import Animated, { AnimatedStyleProp, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useCallback, useRef, useState } from 'react';
import type { Bounds } from '../../shared-types';
import { SnowVallyTheme } from '../../theme';
import { useSnowValley } from '../../context';

SnowVallyTheme.injectAComponentToken({
  Switch: {
    unCheckedBackgroundColor: '$backgroundDisabledColor',
    checkedBackgroundColor: '$backgroundPrimaryColor',
    handler: {
      unCheckedBackgroundColor: 'white',
      checkedBackgroundColor: 'white',
      unCheckedBorderColor: '$backgroundDisabledColor',
      checkedBorderColor: '$backgroundPrimaryColor',
    },
  },
});

export const Switch = (props: SwitchProps) => {
  const { componentTokens } = useSnowValley();
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

  const onViewLayout = useCallback((event: LayoutChangeEvent) => {
    viewBounds.current = {
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y,
      w: event.nativeEvent.layout.width,
      h: event.nativeEvent.layout.height,
    };
  }, []);

  const onHandlerLayout = useCallback((event: LayoutChangeEvent) => {
    handlerBounds.current = {
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y,
      w: event.nativeEvent.layout.width,
      h: event.nativeEvent.layout.height,
    };
  }, []);

  const onChange = (event: GestureResponderEvent) => {
    setChecked(!checked);
    props.onChange?.(!checked, event);
  };

  const [checked, setChecked] = useState(false);

  const handlerStyle = useAnimatedStyle(() => {
    const translateX = checked ? -handlerBounds.current.w / 2 : viewBounds.current.w - handlerBounds.current.w / 2;

    return {
      transform: [
        {
          translateX: withSpring(translateX, {
            damping: 20,
          }),
        },
      ],
    } as AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>;
  }, [checked]);

  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <View style={SwitchStyles.switch} onLayout={onViewLayout}>
        <Animated.View
          style={[
            SwitchStyles.inner,
            {
              backgroundColor: checked
                ? componentTokens.Switch.checkedBackgroundColor
                : componentTokens.Switch.unCheckedBackgroundColor,
            },
          ]}
        />
        <Animated.View
          onLayout={onHandlerLayout}
          style={[
            SwitchStyles.handler,
            handlerStyle,
            {
              backgroundColor: checked
                ? componentTokens.Switch.handler.checkedBackgroundColor
                : componentTokens.Switch.handler.unCheckedBackgroundColor,
              borderColor: checked
                ? componentTokens.Switch.handler.checkedBorderColor
                : componentTokens.Switch.handler.unCheckedBorderColor,
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
