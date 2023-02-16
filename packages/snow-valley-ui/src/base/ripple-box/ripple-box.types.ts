import type { ReactNode } from 'react';
import type {
  HandlerStateChangeEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export interface RippleBoxConfig {
  /**
   * ripple 起点
   * @default 'point'
   * center: 以组件中心为起点
   * point: 以触摸点为起点
   */
  origin?: 'center' | 'point';
  /**
   * ripple 颜色
   * @default 'rgba(0, 0, 0, 0.1)'
   */
  color?: string;
  /**
   * ripple 效果持续时间
   * @default 400
   */
  duration?: number;
}

export interface RippleBoxProps extends RippleBoxConfig {
  /**
   * 是否禁用 ripple 效果
   * @default false
   */
  disabled?: boolean;
  children: ReactNode;
  /**
   * 点击事件
   */
  onPress?: (e: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => void;
  /**
   * ripple 效果结束后的回调
   */
  onRippleFinished?: (e: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => void;
}
