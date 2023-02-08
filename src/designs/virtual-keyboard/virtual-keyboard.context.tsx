import { createContext, ForwardedRef, RefObject, useContext } from 'react';
import type { VirtualKeyboardContextType } from './virtual-keyboard.types';
import type { TextInput, TextInputProps } from 'react-native';

export const VirtualKeyboardContext = createContext<VirtualKeyboardContextType>({
  // 虚拟键盘是否可见
  visible: false,
  // 打开虚拟键盘
  open: (_: RefObject<TextInput>) => {},
  // 关闭虚拟键盘
  dismiss: () => {},
  textInputProps: {},
  proxyingProps: () => {},
});

export const useVirtualKeyboard = (originProps: TextInputProps, ref?: ForwardedRef<TextInput>) => {
  const context = useContext(VirtualKeyboardContext);
  context.proxyingProps(originProps, ref);
  return context;
};
