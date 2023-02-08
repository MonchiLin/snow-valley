import {
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useCallback, useEffect, useRef } from 'react';
import VirtualKeyboardStyle from './virtual-keyboard.style';
import { useSnowValley } from '../../context';
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

function VirtualNumericButton(props: { number: number; hint: string }) {
  return (
    <TouchableOpacity activeOpacity={0.6} style={VirtualKeyboardStyle.VirtualNumericButton}>
      <Text style={VirtualKeyboardStyle.VirtualNumericButtonGroupNumber}>{props.number}</Text>
      <View style={{ paddingLeft: 20 }}>
        <Text style={VirtualKeyboardStyle.VirtualNumericButtonGroupHit}>{props.hint}</Text>
      </View>
    </TouchableOpacity>
  );
}

function VirtualNumericButtonGroup() {
  return (
    <View style={VirtualKeyboardStyle.VirtualNumericButtonGroup}>
      {numericGroup.map((col, index) => {
        return (
          <View style={VirtualKeyboardStyle.VirtualNumericButtonGroupRow} key={index}>
            {col.map((row) => (
              <VirtualNumericButton key={row.number} number={row.number} hint={row.hit} />
            ))}
          </View>
        );
      })}
    </View>
  );
}

export type VirtualNumericKeyboardProps = {
  visible: boolean;
  onVisibleChanged: (newState: boolean) => void;
};

function VirtualKeyboardComponent() {
  return (
    <View>
      <VirtualNumericButtonGroup />
      <View style={[VirtualKeyboardStyle.VirtualNumericBottomGroup]}>
        <View
          style={[VirtualKeyboardStyle.VirtualNumericButton, { backgroundColor: 'transparent' }]}
        />
        <VirtualNumericButton number={0} hint={'+'} />
        <TouchableOpacity
          activeOpacity={0.6}
          style={[VirtualKeyboardStyle.VirtualNumericButton, { justifyContent: 'center' }]}
        >
          <Ionicons name="ios-backspace-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function VirtualNumericKeyboard(props: VirtualNumericKeyboardProps) {
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
              damping: 30,
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
        <VirtualKeyboardComponent />
      </Animated.View>
    </Portal>
  );
}
