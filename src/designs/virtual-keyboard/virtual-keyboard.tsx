import {
  ImageStyle,
  Text,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useCallback, useEffect, useRef } from 'react';
import VirtualKeyboardStyle from './virtual-keyboard.style';
import { useSnowValley } from '../../context/snow-valley.context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { AnimatedStyleProp, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Portal } from '@gorhom/portal';

const numericGroup = [
  [
    { number: 1, hit: '' },
    { number: 2, hit: 'ABC' },
    { number: 3, hit: 'EDF' },
  ],
  [
    { number: 4, hit: 'GHI' },
    { number: 5, hit: 'JKL' },
    { number: 6, hit: 'MNO' },
  ],
  [
    { number: 7, hit: 'PQRS' },
    { number: 8, hit: 'TUV' },
    { number: 9, hit: 'WXYZ' },
  ],
];

function VirtualNumericButton(props: {
  number: number | string;
  hint: string;
  onPress: (key: string) => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.number.toString())}
      activeOpacity={0.6}
      style={VirtualKeyboardStyle.VirtualNumericButton}
    >
      <Text style={VirtualKeyboardStyle.VirtualNumericButtonGroupNumber}>{props.number}</Text>
      <View style={{ paddingLeft: 20 }}>
        <Text style={VirtualKeyboardStyle.VirtualNumericButtonGroupHit}>{props.hint}</Text>
      </View>
    </TouchableOpacity>
  );
}

function VirtualNumericButtonGroup(props: { onPress: (key: string) => void }) {
  return (
    <View style={VirtualKeyboardStyle.VirtualNumericButtonGroup}>
      {numericGroup.map((col, index) => {
        return (
          <View style={VirtualKeyboardStyle.VirtualNumericButtonGroupRow} key={index}>
            {col.map((row) => (
              <VirtualNumericButton
                onPress={props.onPress}
                key={row.number}
                number={row.number}
                hint={row.hit}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
}

export type VirtualKeyboardStateLessProps = {
  // 点击退格
  onBackspacePress: () => void;
  // 点击数字
  onKeyPress: (key: string) => void;
  // 点击小数点
  onDotPress: () => void;
  // 是否输入小数
  keyboardType: TextInputProps['keyboardType'];
};

function VirtualKeyboardStateLess(props: VirtualKeyboardStateLessProps) {
  return (
    <View>
      <VirtualNumericButtonGroup onPress={props.onKeyPress} />
      <View style={[VirtualKeyboardStyle.VirtualNumericBottomGroup]}>
        {props.keyboardType !== 'decimal-pad' ? (
          <View
            style={[VirtualKeyboardStyle.VirtualNumericButton, { backgroundColor: 'transparent' }]}
          />
        ) : (
          <VirtualNumericButton onPress={props.onDotPress} number={'.'} hint={'+'} />
        )}
        <VirtualNumericButton onPress={props.onKeyPress} number={0} hint={'+'} />
        <TouchableOpacity
          onPress={props.onBackspacePress}
          activeOpacity={0.6}
          style={[VirtualKeyboardStyle.VirtualNumericButton, { justifyContent: 'center' }]}
        >
          <Ionicons name="ios-backspace-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export type VirtualNumericKeyboardProps = {
  visible: boolean;
  onVisibleChanged: (newState: boolean) => void;
} & VirtualKeyboardStateLessProps;

export function VirtualNumericKeyboardStateFull(props: VirtualNumericKeyboardProps) {
  const { safeAreaInsets } = useSnowValley();
  const viewRef = useRef<Animated.View>(null);
  const keyboardHeightEffect = useRef({
    height: 300,
    measured: false,
  });
  const dimensions = useWindowDimensions();
  const rootAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            props.visible ? 0 : keyboardHeightEffect.current.height,
            {
              damping: 15,
            },
            (isFinished) => {
              if (isFinished) {
              }
            }
          ),
        },
      ],
    } as AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>;
  }, [props.visible]);

  const measure = useCallback(() => {
    viewRef.current!.measure((x, y, w, h) => {
      keyboardHeightEffect.current.height = h;
      keyboardHeightEffect.current.measured = true;
    });
  }, []);

  useEffect(() => {
    if (!keyboardHeightEffect.current.measured && viewRef.current) {
      measure();
    }
  }, [props.visible]);

  return (
    <Portal>
      <Animated.View
        ref={viewRef}
        style={[
          VirtualKeyboardStyle.VirtualNumericKeyboardContainer,
          { paddingBottom: safeAreaInsets.bottom, width: dimensions.width },
          rootAnimatedStyle,
        ]}
      >
        <VirtualKeyboardStateLess
          onBackspacePress={props.onBackspacePress}
          onDotPress={props.onDotPress}
          onKeyPress={props.onKeyPress}
          keyboardType={props.keyboardType}
        />
      </Animated.View>
    </Portal>
  );
}
