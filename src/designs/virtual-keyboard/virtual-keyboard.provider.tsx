import { ForwardedRef, PropsWithChildren, useCallback, useRef, useState } from 'react';
import { VirtualKeyboardContext } from './virtual-keyboard.context';
import { VirtualNumericKeyboardStateFull } from './virtual-keyboard';
import { useKeyboard } from '../../hooks/use-keyboard';
import type {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import type { VirtualKeyboardContextType } from './virtual-keyboard.types';
import { isInteger, isNumberAllowDotEnd } from '../../utilities/regex';

export function VirtualKeyboardProvider(props: PropsWithChildren<{}>) {
  const [visible, setVisible] = useState(false);
  const keyboard = useKeyboard();
  const textInputRef = useRef<TextInput | undefined>(undefined);
  const proxyedProps = useRef({
    props: {} as TextInputProps,
    ref: undefined as ForwardedRef<TextInput> | undefined,
  });

  const onVisibleChanged = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const open = () => {
    // 如果键盘已经显示了，就等一会再显示, 避免键盘闪烁
    if (keyboard.visible) {
      setTimeout(() => setVisible(true), 200);
    } else {
      setVisible(true);
    }
  };

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    proxyedProps.current.props.onFocus?.(e);
    open();
  };

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    proxyedProps.current.props.onBlur?.(e);
    dismiss();
  }, []);

  const [value, setValue] = useState('');

  const onChangeText = useCallback((text: string) => {
    if (text !== '') {
      if (proxyedProps.current.props.keyboardType === 'decimal-pad') {
        if (!isNumberAllowDotEnd(text)) {
          return;
        }
      } else {
        if (!isInteger(text)) {
          return;
        }
      }
    }
    proxyedProps.current.props.onChangeText?.(text);
    setValue(text);
  }, []);

  const onBackspacePress = () => {
    const text = value.slice(0, value.length - 1);
    onChangeText(text);
  };

  /**
   * 点击 . 按钮
   */
  const onDotPress = () => {
    const text = value + '.';
    onChangeText(text);
  };

  const onKeyPress = (key: string) => {
    const text = value + key;
    onChangeText(text);
  };

  // 代理传入 textInput 的原始 props
  const proxyingProps = (originProps: TextInputProps, ref?: ForwardedRef<TextInput>) => {
    setValue(originProps.value ?? '');
    proxyedProps.current.props = originProps;
    proxyedProps.current.ref = ref;
  };

  const textInputProps: VirtualKeyboardContextType['textInputProps'] = {
    value,
    onChangeText,
    onFocus: onFocus,
    onBlur: onBlur,
    showSoftInputOnFocus: false,
    ref: (ref: TextInput) => {
      textInputRef.current = ref;
      if (typeof proxyedProps.current.ref === 'function') {
        proxyedProps.current.ref(ref);
      } else if (proxyedProps.current.ref) {
        proxyedProps.current.ref.current = ref;
      }
    },
  };

  return (
    <VirtualKeyboardContext.Provider
      value={{ visible, open: open, dismiss: dismiss, proxyingProps, textInputProps }}
    >
      {props.children}
      <VirtualNumericKeyboardStateFull
        onBackspacePress={onBackspacePress}
        onDotPress={onDotPress}
        onKeyPress={onKeyPress}
        keyboardType={proxyedProps.current?.props?.keyboardType}
        visible={visible}
        onVisibleChanged={onVisibleChanged}
      />
    </VirtualKeyboardContext.Provider>
  );
}
