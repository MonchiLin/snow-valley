import type {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import type { ComponentType, RefAttributes } from 'react';
import * as React from 'react';
import { forwardRef } from 'react';
import { useVirtualKeyboard } from './virtual-keyboard.context';

type TheDuckNamedTextInput = ComponentType<TextInputProps & RefAttributes<TextInput>>;

/**
 * 创建一个受控的虚拟键盘组件, 接受一个 TextInput 组件
 * 通过监听 onFocus 和 onBlur 事件决定是否显示虚拟键盘
 * 如果你需要手动控制虚拟键盘的显示和隐藏, 应该直接通过 useVirtualKeyboard 获取 VirtualKeyboardContext
 * 然后调用其 show 和 hide 方法, 不需要使用 VirtualKeyboardHOC
 */
export type VirtualKeyboardHOCProps = {} & TextInputProps;

export function VirtualKeyboardHOC(Component: TheDuckNamedTextInput) {
  return forwardRef<TextInput, VirtualKeyboardHOCProps>(function (props, ref) {
    const virtualKeyboard = useVirtualKeyboard();

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      props.onFocus?.(e);
      virtualKeyboard.show();
    };

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      props.onBlur?.(e);
      virtualKeyboard.hide();
    };

    return (
      <Component
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        showSoftInputOnFocus={false}
        ref={ref}
      />
    );
  });
}
