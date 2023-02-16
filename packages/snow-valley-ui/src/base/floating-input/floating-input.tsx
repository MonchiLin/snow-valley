import type { StyleProp, TextStyle } from 'react-native';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSnowValley } from '../../context/snow-valley.context';
import { SnowVallyTheme } from '../../theme/theme';
import styles from './floating-input.style';

SnowVallyTheme.injectAComponentToken({
  FloatingInput: {
    focused: {
      labelColor: '$textPrimaryColor',
      borderColor: '$borderFocusColor',
    },
    unFocused: {
      labelColor: '$textNormalColor',
      borderColor: '$borderNormalColor',
    },
  },
});

export const SelectableInputSwitchView = (props: {
  children: ReactNode;
  identifier: string | null | undefined | number;
}) => {
  const yOffset = useSharedValue(20);
  const opacity = useSharedValue(0);
  const prevIdentifier = useRef(props.identifier);
  // 这样做的意义是保证 updateChildren 能够拿到最新的 props.children
  const chidrenRef = useRef(props.children);
  const [currentChildren, setCurrentChildren] = useState<ReactNode>(props.children);

  const labelOffsetAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: yOffset.value }],
      left: 8,
      position: 'absolute',
      opacity: opacity.value,
    };
  }, [opacity, yOffset]);

  const updateChildren = () => {
    setCurrentChildren(chidrenRef.current);
  };

  useEffect(() => {
    chidrenRef.current = props.children;
    if (props.identifier) {
      if (prevIdentifier.current) {
        // 避免重复设置
        if (prevIdentifier.current === props.identifier) {
          return;
        }
        // 如果之前已经选择过一个, 则执行切换过渡
        yOffset.value = withSpring(-10, { mass: 0.2 }, () => {
          yOffset.value = 20;
          opacity.value = 0.2;
          runOnJS(updateChildren)();
          yOffset.value = withSpring(0, { mass: 0.6 });
          opacity.value = withSpring(1, { mass: 1 });
        });
        opacity.value = withSpring(0, { mass: 1 });
      } else {
        setCurrentChildren(props.children);
        // 如果是第一次选择, 则执行初始过渡
        yOffset.value = withSpring(0, { mass: 0.6 });
        opacity.value = withSpring(1, { mass: 1 });
      }
    } else {
      chidrenRef.current = null;
      updateChildren();
      yOffset.value = withSpring(20, { mass: 0.6 });
      opacity.value = withSpring(0, { mass: 1 });
    }
    prevIdentifier.current = props.identifier;
  }, [props.children, props.identifier]);

  return <Animated.View style={[labelOffsetAnimatedStyles]}>{currentChildren}</Animated.View>;
};

export type SelectableInputProps = {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  children: ReactNode;
  // 是否处于聚焦状态, 如果是聚焦状态则 label 变为浮动
  focused?: boolean;
};

export const FloatingInput = (props: SelectableInputProps) => {
  const { componentTokens } = useSnowValley();
  const labelOffset = useSharedValue(0);
  const containerBorderColor = useSharedValue(componentTokens.FloatingInput.unFocused.borderColor);
  const labelColor = useSharedValue(componentTokens.FloatingInput.unFocused.labelColor);

  const labelFontSize = useSharedValue(16);

  const labelOffsetAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: labelOffset.value }],
    };
  });

  const containerAnimatedStyles = useAnimatedStyle(() => {
    return {
      borderColor: containerBorderColor.value,
    };
  });
  const labelStyles = useAnimatedStyle(() => {
    return {
      color: labelColor.value,
      fontSize: labelFontSize.value,
    };
  });

  useEffect(() => {
    if (props.focused) {
      labelOffset.value = withSpring(-22, { mass: 0.3 });
      containerBorderColor.value = componentTokens.FloatingInput.focused.borderColor;
      labelColor.value = componentTokens.FloatingInput.focused.labelColor;
      labelFontSize.value = withSpring(12, { mass: 0.3 });
    } else {
      labelOffset.value = withSpring(0, { mass: 0.3 });
      containerBorderColor.value = componentTokens.FloatingInput.unFocused.borderColor;
      labelColor.value = componentTokens.FloatingInput.unFocused.labelColor;
      labelFontSize.value = withSpring(16, { mass: 0.3 });
    }
  }, [props.focused]);

  return (
    <Animated.View style={[styles.boxContainer, containerAnimatedStyles]}>
      <Animated.View style={[styles.labelContainer, labelOffsetAnimatedStyles]}>
        <Animated.Text style={[labelStyles, props.labelStyle]}>{props.label}</Animated.Text>
      </Animated.View>
      {props.children}
    </Animated.View>
  );
};
