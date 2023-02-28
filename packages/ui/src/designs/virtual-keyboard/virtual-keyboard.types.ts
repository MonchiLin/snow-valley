import type { TextInput, TextInputProps } from 'react-native';
import type { ForwardedRef, RefAttributes, RefObject } from 'react';

export interface VirtualKeyboardContextType {
  visible: boolean;
  open: (textInput: RefObject<TextInput>) => void;
  dismiss: () => void;
  proxyingProps: (
    props: TextInputProps,
    ref: ForwardedRef<TextInput> | undefined,
    id: string
  ) => TextInputProps & RefAttributes<TextInput>;
}
