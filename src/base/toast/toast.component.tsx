import type { ToastOptions } from 'snow-valley';
import { SnowVallyTheme } from '../../theme';
import { useSnowValley } from '../../context/snow-valley.context';
import { Pressable, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import Animated, { Easing, Layout } from 'react-native-reanimated';
import { ToastAnimation } from './toast.animation';
import styles from './toast.style';
import { Shadow } from 'react-native-shadow-2';

SnowVallyTheme.injectAComponentToken({
  Toast: {
    zIndex: 1000,
    duration: 2000,
    maxCount: null,
  },
});

const ToastRender = ({ toast }: { toast: ToastOptions }): JSX.Element => {
  return typeof toast.message === 'string' ? (
    <Text>{toast.message}</Text>
  ) : (
    (toast.message as JSX.Element)
  );
};

const createToastType =
  (icon: ReactNode) =>
  ({ toast }: { toast: ToastOptions }) => {
    return (
      <Shadow startColor={`rgb(0 0 0 / 6%)`} distance={12} style={styles.toastWrapper}>
        {icon}
        <ToastRender toast={toast} />
      </Shadow>
    );
  };

const ToastLevelInfo = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="exclamationcircle" size={14} color="#1677ff" style={[styles.toastIcon]} />
  )({ toast });
};

const ToastLevelSuccess = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="checkcircle" size={14} color="#52c41a" style={[styles.toastIcon]} />
  )({ toast });
};

const ToastLevelError = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="closecircle" size={14} color="#f5222d" style={[styles.toastIcon]} />
  )({ toast });
};

const ToastLevelWarning = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="warning" size={14} color="#faad14" style={[styles.toastIcon]} />
  )({ toast });
};

export const ToastComponent = ({ toast }: { toast: ToastOptions }) => {
  return (
    <Pressable onPress={() => toast.onClose?.()}>
      <View style={styles.toast}>
        {toast.type === 'info' && <ToastLevelInfo toast={toast} />}
        {toast.type === 'success' && <ToastLevelSuccess toast={toast} />}
        {toast.type === 'error' && <ToastLevelError toast={toast} />}
        {toast.type === 'warning' && <ToastLevelWarning toast={toast} />}
      </View>
    </Pressable>
  );
};

export const ToastGroupComponent = (props: {
  toasts: ToastOptions[];
  placement: ToastOptions['placement'];
}) => {
  const { componentTokens, safeAreaInsets } = useSnowValley();

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.group,
        { zIndex: componentTokens.Toast.zIndex },
        props.placement === 'top'
          ? { marginTop: safeAreaInsets.top }
          : { marginBottom: safeAreaInsets.bottom },
      ]}
    >
      {props.toasts.map((toast) => {
        return (
          <Animated.View
            entering={ToastAnimation.Entering}
            exiting={ToastAnimation.Exiting}
            layout={Layout.easing(Easing.linear)}
            key={toast.uniqueId}
            style={[
              props.placement === 'top' ? styles.toastBottomMargin : styles.toastBottomMargin,
            ]}
          >
            <ToastComponent toast={toast} />
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};
