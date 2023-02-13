import type { ToastOptions } from 'snow-valley';
import { SnowVallyTheme } from '../../theme';
import { useSnowValley } from '../../context/snow-valley.context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import Animated from 'react-native-reanimated';
import { ToastAnimation } from './toast.animation';

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
      <View style={styles.toastWrapper}>
        {icon}
        <ToastRender toast={toast} />
      </View>
    );
  };

const ToastLevelInfo = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="exclamationcircle" size={14} color="#1677ff" className={'mr-4'} />
  )({ toast });
};

const ToastLevelSuccess = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="checkcircle" size={14} color="#52c41a" className={'mr-4'} />
  )({ toast });
};

const ToastLevelError = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="closecircle" size={14} color="#f5222d" className={'mr-4'} />
  )({ toast });
};

const ToastLevelWarning = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(<AntDesign name="warning" size={14} color="#faad14" className={'mr-4'} />)(
    { toast }
  );
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

const styles = StyleSheet.create({
  group: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  toastTopMargin: {
    marginTop: 10,
  },
  toastBottomMargin: {
    marginBottom: 10,
  },
  toastWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
  toast: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
});
