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
import type { KeyboardTypeOptions, TextInput, TextInputProps } from 'react-native';
import { BackHandler, Keyboard, Platform } from 'react-native';
import { isInteger, isNumberAllowDotEnd } from '../../utilities/regex';
import { useBackspace } from './virtual-keyboard.hooks';
import { useAppState } from '../../hooks/use-app-state';
// import * as Haptics from 'expo-haptics';

const isAndroid = Platform.OS === 'android';

export function VirtualKeyboardProvider(props: PropsWithChildren<{}>) {
  const [virtualKeyboardVisible, setVirtualKeyboardVisible] = useState(false);
  const virtualKeyboardBackspace = useBackspace();
  const appState = useAppState();
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
        ref: TextInput | null;
        proxyedProps: TextInputProps & RefAttributes<TextInput>;
        keyboardType: undefined | KeyboardTypeOptions;
        uid: string;
      }
    | undefined
  >(undefined);

  // 监听返回键
  useEffect(() => {
    const backAction = () => {
      if (virtualKeyboardVisible) {
        dismiss();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [virtualKeyboardVisible]);

  appState.onForeground(
    useCallback(() => {
      // 在某些情况下
      // Android 手机聚焦到输入框后，App 切换到后台, 在切换到前台, 虚拟键盘会自动弹出
      if (isAndroid && virtualKeyboardVisible) {
        Keyboard.dismiss();
        currentProxyedProps.current?.ref?.focus();
      }
    }, [virtualKeyboardVisible])
  );

  const onVisibleChanged = (newVisible: boolean) => {
    setVirtualKeyboardVisible(newVisible);
  };

  const open = () => {
    // 如果键盘已经显示了，就等一会再显示, 避免键盘闪烁
    setVirtualKeyboardVisible(true);
  };

  const dismiss = useCallback(() => {
    setVirtualKeyboardVisible(false);
  }, []);

  const getCurrentValue = useCallback(() => {
    if (!currentProxyedProps.current) {
      return '';
    }
    return currentProxyedProps.current?.proxyedProps.value ?? '';
  }, []);

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
    if (currentProxyedProps.current!.proxyedProps.onChangeText) {
      currentProxyedProps.current!.proxyedProps.onChangeText(text);
      // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  const onBackspacePressIn = () => {
    virtualKeyboardBackspace.handleBackspacePressIn(getCurrentValue(), onChangeText);
  };

  const onBackspacePressOut = () => {
    virtualKeyboardBackspace.handleBackspacePressOut();
  };

  const onBackspacePress = () => {
    virtualKeyboardBackspace.handleBackspacePress();
  };

  /**
   * 点击 . 按钮
   */
  const onDotPress = () => {
    const value = getCurrentValue();
    const text = value + '.';
    onChangeText(text);
  };

  /**
   * 点击数值
   * @param key
   */
  const onKeyPress = (key: string) => {
    const value = getCurrentValue();
    const text = value + key;
    onChangeText(text);
  };

  // 代理传入 textInput 的原始 props
  const proxyingProps = (
    originProps: TextInputProps,
    originRef: ForwardedRef<TextInput> | undefined,
    id: string
  ): TextInputProps & RefAttributes<TextInput> => {
    const refMock: { current: TextInput | null } = { current: null };

    if (currentProxyedProps.current && currentProxyedProps.current!.uid === id) {
      currentProxyedProps.current!.proxyedProps.value = originProps.value;
    }

    const textInputProps: TextInputProps & RefAttributes<TextInput> = {
      ...originProps,
      onFocus: (e) => {
        currentProxyedProps.current = {
          proxyedProps: textInputProps,
          ref: refMock.current,
          uid: id,
          keyboardType: originProps.keyboardType,
        };
        originProps.onFocus?.(e);
        open();
      },
      onBlur: (e) => {
        originProps.onBlur?.(e);
        dismiss();
      },
      // 仅在 ios 生效
      showSoftInputOnFocus: false,
      // 仅在 android 生效
      keyboardType: 'none' as any,
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
      value={{ visible: virtualKeyboardVisible, open: open, dismiss: dismiss, proxyingProps }}
    >
      {props.children}
      <VirtualNumericKeyboardStateFull
        onBackspacePress={onBackspacePress}
        onBackspacePressIn={onBackspacePressIn}
        onBackspacePressOut={onBackspacePressOut}
        onDotPress={onDotPress}
        onKeyPress={onKeyPress}
        keyboardType={currentProxyedProps.current?.keyboardType}
        visible={virtualKeyboardVisible}
        onVisibleChanged={onVisibleChanged}
      />
    </VirtualKeyboardContext.Provider>
  );
}
