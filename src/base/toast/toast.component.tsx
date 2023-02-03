import type { ToastOptions } from 'snow-valley';
import { useSnowValley } from 'snow-valley';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { ReactNode } from 'react';

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
      <View style={styles.toastWapper}>
        {icon}
        <ToastRender toast={toast} />
      </View>
    );
  };

const ToastLevelInfo = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="exclamationcircle" size={14} color="#1677ff" style={{ marginRight: 10 }} />
  )({ toast });
};

const ToastLevelSuccess = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="checkcircle" size={14} color="#52c41a" style={{ marginRight: 10 }} />
  )({ toast });
};

const ToastLevelError = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="closecircle" size={14} color="#f5222d" style={{ marginRight: 10 }} />
  )({ toast });
};

const ToastLevelWarning = ({ toast }: { toast: ToastOptions }) => {
  return createToastType(
    <AntDesign name="warning" size={14} color="#faad14" style={{ marginRight: 10 }} />
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

export const ToastGroup = (props: {
  toasts: ToastOptions[];
  placement: ToastOptions['placement'];
}) => {
  const { component, safeAreaInsets } = useSnowValley();

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.group,
        { zIndex: component.Toast.zIndex },
        props.placement === 'top'
          ? { marginTop: safeAreaInsets.top }
          : { marginBottom: safeAreaInsets.bottom },
      ]}
    >
      {props.toasts.map((toast) => {
        return (
          <View
            key={toast.uniqueId}
            style={[props.placement === 'top' ? { marginBottom: 10 } : { marginTop: 10 }]}
          >
            <ToastComponent toast={toast} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  toastWapper: {
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
