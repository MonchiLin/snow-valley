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
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import VirtualKeyboardStyle from './virtual-keyboard.style';
import { useSnowValley } from '../../context/snow-valley.context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { AnimatedStyleProp, FadeIn, FadeOut, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Portal } from '@gorhom/portal';

const numericGroup = [
  [
    { keyValue: 1, hit: '' },
    { keyValue: 2, hit: 'ABC' },
    { keyValue: 3, hit: 'EDF' },
  ],
  [
    { keyValue: 4, hit: 'GHI' },
    { keyValue: 5, hit: 'JKL' },
    { keyValue: 6, hit: 'MNO' },
  ],
  [
    { keyValue: 7, hit: 'PQRS' },
    { keyValue: 8, hit: 'TUV' },
    { keyValue: 9, hit: 'WXYZ' },
  ],
];

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface VirtualButtonProps {
  onPress: (key: string) => void;
  keyValue?: string | number;
  hit?: string;
  children?: ReactNode;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

function VirtualBoardKey(props: VirtualButtonProps) {
  return (
    <AnimatedTouchableOpacity
      entering={FadeIn}
      exiting={FadeOut}
      onPressOut={props.onPressOut}
      onPressIn={props.onPressIn}
      onPress={() => props.onPress(props.keyValue ? props.keyValue.toString() : '')}
      activeOpacity={0.6}
      style={[VirtualKeyboardStyle.VirtualNumericButton, { justifyContent: props.hit ? 'space-between' : 'center' }]}
    >
      {props.children ? (
        props.children
      ) : (
        <>
          <Text style={VirtualKeyboardStyle.VirtualNumericButtonGroupNumber}>{props.keyValue}</Text>
          {props.hit && (
            <View style={{ paddingLeft: 20 }}>
              <Text style={VirtualKeyboardStyle.VirtualNumericButtonGroupHit}>{props.hit}</Text>
            </View>
          )}
        </>
      )}
    </AnimatedTouchableOpacity>
  );
}

function VirtualNumericButtonGroup(props: { onPress: (key: string) => void }) {
  return (
    <View style={VirtualKeyboardStyle.VirtualNumericButtonGroup}>
      {numericGroup.map((col, index) => {
        return (
          <View style={VirtualKeyboardStyle.VirtualNumericButtonGroupRow} key={index}>
            {col.map((row) => (
              <VirtualBoardKey onPress={props.onPress} keyValue={row.keyValue} key={row.keyValue} hit={row.hit} />
            ))}
          </View>
        );
      })}
    </View>
  );
}

export type VirtualKeyboardStateLessProps = {
  // 按下退格按钮
  onBackspacePressIn: () => void;
  // 松开退格按钮
  onBackspacePressOut: () => void;
  // 按下退格按钮并松开
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
          <View style={[VirtualKeyboardStyle.VirtualNumericButton, { backgroundColor: 'transparent' }]} />
        ) : (
          <VirtualBoardKey onPress={props.onDotPress} keyValue={'.'} hit={'+'} />
        )}
        <VirtualBoardKey onPress={props.onKeyPress} keyValue={0} hit={'+'} />
        <VirtualBoardKey
          onPressIn={props.onBackspacePressIn}
          onPressOut={props.onBackspacePressOut}
          onPress={props.onBackspacePress}
        >
          <Ionicons name="ios-backspace-outline" size={24} color="black" />
        </VirtualBoardKey>
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
          onBackspacePressIn={props.onBackspacePressIn}
          onBackspacePressOut={props.onBackspacePressOut}
          onDotPress={props.onDotPress}
          onKeyPress={props.onKeyPress}
          keyboardType={props.keyboardType}
        />
      </Animated.View>
    </Portal>
  );
}
