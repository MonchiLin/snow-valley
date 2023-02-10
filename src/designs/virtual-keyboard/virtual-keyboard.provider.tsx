import {
  ForwardedRef,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  // 被引用的 TextInput
  const textRef = useRef<TextInput | null>(null);
  const proxyedProps = useRef<Map<ForwardedRef<TextInput>, { props: TextInputProps }> | null>(
    new Map()
  );
  const currentProxyedProps = useRef<{
    ref: ForwardedRef<TextInput | null>;
    forwardRef: ForwardedRef<TextInput | null>;
    props: TextInputProps;
  } | null>({
    ref: null,
    forwardRef: null,
    props: {},
  });

  useEffect(() => {
    return () => {
      // 销毁 proxyedProps
      proxyedProps.current = null;
      // 销毁当前的 currentProxyedProps
      currentProxyedProps.current = null;
    };
  }, []);

  const updateCurrentTextInput = useCallback(() => {
    if (!proxyedProps.current) {
      currentProxyedProps.current = null;
    } else {
      // 从 proxyedProps 中找到正在聚焦的 TextInput
      const items = Array.from(proxyedProps.current!.entries());
      const item = items.find(([ref]) => {
        return (ref as MutableRefObject<TextInput>).current === textRef.current;
      });
      if (item) {
        currentProxyedProps.current = {
          forwardRef: item[0],
          props: item[1].props,
          ref: null,
        };
      } else {
        currentProxyedProps.current = null;
      }
    }
  }, []);

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
    currentProxyedProps.current!.props.onFocus?.(e);
    open();
  };

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    currentProxyedProps.current!.props.onBlur?.(e);
    dismiss();
  }, []);

  const [value, setValue] = useState('');

  const onChangeText = useCallback((text: string) => {
    if (text !== '') {
      if (currentProxyedProps.current!.props.keyboardType === 'decimal-pad') {
        if (!isNumberAllowDotEnd(text)) {
          return;
        }
      } else {
        if (!isInteger(text)) {
          return;
        }
      }
    }
    currentProxyedProps.current!.props.onChangeText?.(text);
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
    proxyedProps.current!.set(ref!, { props: originProps });
    updateCurrentTextInput();
  };

  const textInputProps: VirtualKeyboardContextType['textInputProps'] = {
    value,
    onChangeText,
    onFocus: onFocus,
    onBlur: onBlur,
    showSoftInputOnFocus: false,
    ref: (ref: TextInput) => {
      if (currentProxyedProps.current?.ref) {
        if (typeof currentProxyedProps.current!.ref === 'function') {
          currentProxyedProps.current!.ref(ref);
        } else {
          currentProxyedProps.current!.ref!.current = ref;
        }
      }
      textRef.current = ref;
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
        keyboardType={currentProxyedProps.current?.props?.keyboardType}
        visible={visible}
        onVisibleChanged={onVisibleChanged}
      />
    </VirtualKeyboardContext.Provider>
  );
}
