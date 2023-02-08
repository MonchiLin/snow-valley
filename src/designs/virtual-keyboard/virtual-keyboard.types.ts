import type { TextInput, TextInputProps } from 'react-native';
import type { RefAttributes, RefObject, ForwardedRef } from 'react';

export interface VirtualKeyboardContextType {
  visible: boolean;
  open: (textInput: RefObject<TextInput>) => void;
  dismiss: () => void;
  textInputProps: TextInputProps & RefAttributes<TextInput>;
  proxyingProps: (props: TextInputProps, ref?: ForwardedRef<TextInput>) => void;
}
