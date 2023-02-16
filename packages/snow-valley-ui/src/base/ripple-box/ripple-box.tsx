import type { HandlerStateChangeEvent } from 'react-native-gesture-handler';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import type { ValueOf } from '../../shared-types';
import { LayoutChangeEvent, View } from 'react-native';
import styles from './ripple-box.style';
import { useMemo, useRef, useState } from 'react';
import type { RippleBoxConfig, RippleBoxProps } from './ripple-box.types';
import { useSnowValley } from '../../context';
import { SnowVallyTheme } from '../../theme';
import { Ripple } from './ripple';
import { uid } from '../../utilities/number';

SnowVallyTheme.injectAComponentToken({
  RippleBox: {
    color: 'rgb(0, 26, 114)',
    duration: 800,
    origin: 'point',
  },
});

const preset: Required<RippleBoxConfig> = {
  color: 'rgb(0, 26, 114)',
  duration: 800,
  origin: 'point',
};

interface RippleConfig extends RippleBoxConfig {
  kind: 'longPress' | 'press';
  uid: string;
  pointAbsoluteX: number;
  pointAbsoluteY: number;
}

export const RippleBox = (props: RippleBoxProps) => {
  const { componentTokens } = useSnowValley();
  const config: Required<RippleBoxConfig> = useMemo(() => {
    return Object.assign(preset, componentTokens.RippleBox, props);
  }, [componentTokens.RippleBox, props]);
  const [ripples, setRipples] = useState<Required<RippleConfig>[]>([]);

  // children 的大小
  const [referenceBounds, setReferenceBounds] = useState({ w: 0, h: 0 });

  const state = useRef<ValueOf<typeof State>>(State.UNDETERMINED);

  const onHandlerStateChange = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
    props.onPress?.(event);
    state.current = event.nativeEvent.state;

    const x = event.nativeEvent.x;
    const y = event.nativeEvent.y;
    if (state.current === State.BEGAN) {
      setRipples((prev) => {
        return [
          ...prev,
          {
            ...config,
            kind: 'press',
            uid: uid(),
            pointAbsoluteX: x,
            pointAbsoluteY: y,
          } as Required<RippleConfig>,
        ];
      });
    } else if (state.current === State.ACTIVE) {
    } else if (state.current === State.END || state.current === State.FAILED) {
    }
  };

  const onViewLayout = (event: LayoutChangeEvent) => {
    setReferenceBounds({
      w: event.nativeEvent.layout.width,
      h: event.nativeEvent.layout.height,
    });
  };

  return (
    <TapGestureHandler maxDurationMs={9999999999} onHandlerStateChange={onHandlerStateChange}>
      <View onLayout={onViewLayout} style={[styles.boxContainer]}>
        {props.children}
        {ripples.map((ripple) => {
          return (
            <Ripple
              key={ripple.uid}
              origin={ripple.origin}
              duration={ripple.duration}
              color={ripple.color}
              pointAbsoluteX={ripple.pointAbsoluteX}
              pointAbsoluteY={ripple.pointAbsoluteY}
              referenceHeight={referenceBounds.h}
              referenceWidth={referenceBounds.w}
              onRippleEnd={() => {
                setRipples((prev) => {
                  return prev.filter((item) => item.uid !== ripple.uid);
                });
              }}
            />
          );
        })}
      </View>
    </TapGestureHandler>
  );
};
