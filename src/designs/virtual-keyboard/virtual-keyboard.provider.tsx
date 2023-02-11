import {
  ForwardedRef,
  PropsWithChildren,
  RefAttributes,
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
import { isInteger, isNumberAllowDotEnd } from '../../utilities/regex';

export function VirtualKeyboardProvider(props: PropsWithChildren<{}>) {
  const [visible, setVisible] = useState(false);
  const keyboard = useKeyboard();
  const proxyedPropses = useRef(
    new Map<
      string,
      {
        proxyedProps: TextInputProps & RefAttributes<TextInput>;
        ref: { current: TextInput | null };
      }
    >()
  );

  const currentProxyedProps = useRef<
    | {
        ref: { current: TextInput | null };
        proxyedProps: TextInputProps & RefAttributes<TextInput>;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    return () => {
      // 销毁 proxyedPropses
      proxyedPropses.current = new Map();
      // 销毁当前的 currentProxyedProps
      currentProxyedProps.current = undefined;
    };
  }, []);

  const updateCurrentTextInput = useCallback(() => {
    // 从 proxyedPropses 中找到正在聚焦的 TextInput
    const items = Array.from(proxyedPropses.current!.values());
    currentProxyedProps.current = items.find(({ ref }) => {
      return ref!.current!.isFocused();
    });
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
    updateCurrentTextInput();
    currentProxyedProps.current!.proxyedProps.onFocus?.(e);
    open();
  };

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    updateCurrentTextInput();
    currentProxyedProps.current!.proxyedProps.onBlur?.(e);
    dismiss();
  }, []);

  const [value, setValue] = useState('');

  const onChangeText = useCallback((text: string) => {
    if (text !== '') {
      if (currentProxyedProps.current!.proxyedProps.keyboardType === 'decimal-pad') {
        if (!isNumberAllowDotEnd(text)) {
          return;
        }
      } else {
        if (!isInteger(text)) {
          return;
        }
      }
    }
    currentProxyedProps.current!.proxyedProps.onChangeText?.(text);
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
  const proxyingProps = (
    originProps: TextInputProps,
    originRef: ForwardedRef<TextInput> | undefined,
    id: string
  ): TextInputProps & RefAttributes<TextInput> => {
    setValue(originProps.value ?? '');
    const refMock: { current: TextInput | null } = { current: null };

    const textInputProps: TextInputProps & RefAttributes<TextInput> = {
      value,
      onChangeText,
      onFocus: onFocus,
      onBlur: onBlur,
      showSoftInputOnFocus: false,
      ref: (_ref: TextInput | null) => {
        refMock.current = _ref;
        if (originRef) {
          if (typeof originRef === 'function') {
            originRef(_ref);
          } else {
            originRef!.current = _ref;
          }
        }
      },
    };

    proxyedPropses.current!.set(id, { proxyedProps: originProps, ref: refMock });
    return textInputProps;
  };

  return (
    <VirtualKeyboardContext.Provider
      value={{ visible, open: open, dismiss: dismiss, proxyingProps }}
    >
      {props.children}
      <VirtualNumericKeyboardStateFull
        onBackspacePress={onBackspacePress}
        onDotPress={onDotPress}
        onKeyPress={onKeyPress}
        keyboardType={currentProxyedProps.current?.proxyedProps?.keyboardType}
        visible={visible}
        onVisibleChanged={onVisibleChanged}
      />
    </VirtualKeyboardContext.Provider>
  );
}
