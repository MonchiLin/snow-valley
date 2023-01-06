import { GestureResponderEvent, StyleSheet } from 'react-native';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const SelectableInputSwitchView = (props: {
  children: ReactNode;
  identifier: string | null | undefined | number;
}) => {
  const yOffset = useSharedValue(20);
  const opacity = useSharedValue(0);
  const prevIdentifier = useRef(props.identifier);
  const [currentChildren, setCurrentChildren] = useState<ReactNode>(
    props.children
  );

  const labelOffsetAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: yOffset.value }],
      left: 8,
      position: 'absolute',
      opacity: opacity.value,
    };
  }, [opacity, yOffset]);

  const set = () => {
    setCurrentChildren(props.children);
  };

  useEffect(() => {
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
          runOnJS(set)();
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
      setCurrentChildren(null);
      yOffset.value = withSpring(20, { mass: 0.6 });
      opacity.value = withSpring(0, { mass: 1 });
    }
    prevIdentifier.current = props.identifier;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children, props.identifier]);

  return (
    <Animated.View style={[labelOffsetAnimatedStyles]}>
      {currentChildren}
    </Animated.View>
  );
};

export type SelectableInputProps = {
  label: string;
  children: ReactNode;
  focused?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export const SelectableInput = (props: SelectableInputProps) => {
  const labelOffset = useSharedValue(0);
  // #DBDBDB "#64A0E8"
  const containerBorderColor = useSharedValue('#DBDBDB');
  // #64A0E8 "#A8A8A8"
  const labelColor = useSharedValue('#64A0E8');
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
      containerBorderColor.value = '#64A0E8';
      labelColor.value = '#64A0E8';
      labelFontSize.value = withSpring(12, { mass: 0.3 });
    } else {
      labelOffset.value = withSpring(0, { mass: 0.3 });
      containerBorderColor.value = '#DBDBDB';
      labelColor.value = '#A8A8A8';
      labelFontSize.value = withSpring(16, { mass: 0.3 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.focused]);

  return (
    <Animated.View style={[styles.container, containerAnimatedStyles]}>
      <Animated.View style={[styles.labelContainer, labelOffsetAnimatedStyles]}>
        <Animated.Text style={[labelStyles]}>{props.label}</Animated.Text>
      </Animated.View>
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    position: 'relative',
    height: 45,
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    left: 8,
  },
});
