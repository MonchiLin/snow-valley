import { EntryExitAnimationFunction, withSpring } from 'react-native-reanimated';
import type { ToastOptions } from './toast.types';
import type { EdgeInsets } from '../../shared-types';

interface ToastGroup {
  options: ToastOptions[];
  position: EdgeInsets;
}

export class ToastAnimation {
  groups = new Map<ToastOptions['placement'], ToastGroup>();
}

export namespace ToastAnimation {
  export const Entering: EntryExitAnimationFunction = (values: any) => {
    'worklet';

    const animations = {
      originX: withSpring(values.targetOriginX),
    };

    const initialValues = {
      originX: values.targetOriginX - 50,
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  };
  export const Exiting: EntryExitAnimationFunction = (values: any) => {
    'worklet';

    const animations = {
      originY: withSpring(0),
      originX: withSpring(values.currentOriginX + 50),
      opacity: withSpring(0),
    };

    const initialValues = {
      originY: values.currentOriginY,
      originX: values.currentOriginX,
      opacity: 1,
    };

    return {
      initialValues,
      animations,
    };
  };
}
