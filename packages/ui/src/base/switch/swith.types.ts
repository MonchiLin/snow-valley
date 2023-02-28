import type { GestureResponderEvent } from 'react-native';
import type { ReactNode } from 'react';

export type SwitchProps = {
  // 是否选中
  checked?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 初始状态
  defaultChecked?: boolean;
  // 是否处于加载中
  loading?: boolean;
  // 变化时的回调函数
  onChange?: (checked: boolean, event: GestureResponderEvent) => void;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
};
