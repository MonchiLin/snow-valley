import type { SnowValleyProps } from './snow-valley.types';
import { LonelySnowValley } from './lonely-snow-valley.provider';
import { ToastProvider } from '../base/toast/toast.provider';
import { VirtualKeyboardProvider } from '../designs/virtual-keyboard/virtual-keyboard.provider';

export const SnowValley = (props: SnowValleyProps) => {
  return (
    <LonelySnowValley safeAreaInsets={props.safeAreaInsets}>
      <VirtualKeyboardProvider>
        <ToastProvider globalize>{props.children}</ToastProvider>
      </VirtualKeyboardProvider>
    </LonelySnowValley>
  );
};
