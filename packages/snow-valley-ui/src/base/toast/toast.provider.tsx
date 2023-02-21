import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { ToastContext } from './toast.context';
import type { ToastOptions } from './toast.types';
import { _unsafeToastEnabled, _unsafeToastEventEmitter } from '../../escape-hatch/toast';
import { ToastGroupComponent } from './toast.component';

type Props = {
  children: ReactNode;
  defaultOptions?: Omit<ToastOptions, 'message' | 'uniqueId'>;
  /**
   * 在某些情况下, 你可能需要在 React 组件之外使用 Toast (without useToast)
   * 当然, 要先使用 ToastProvider 组件包裹你的应用
   */
  globalize?: boolean;
};

export const ToastProvider = ({ children, defaultOptions, globalize = false }: Props) => {
  const [extractQueues, setExtractQueues] = useState<{
    top: ToastOptions[];
    center: ToastOptions[];
    bottom: ToastOptions[];
  }>({ top: [], center: [], bottom: [] });

  const open = useCallback(
    (options: ToastOptions) => {
      options = {
        duration: options.duration || defaultOptions?.duration || 1000,
        closeOnClick: options.closeOnClick || defaultOptions?.closeOnClick || false,
        placement: options.placement || defaultOptions?.placement || 'top',
        type: options.type || defaultOptions?.type || 'info',
        onClose: options.onClose || defaultOptions?.onClose || (() => {}),
        uniqueId: options.uniqueId || new Date().getTime().toString(),
        message: options.message,
      };

      setExtractQueues((state) => {
        return {
          ...state,
          [options.placement!]: [...state[options.placement!], options],
        };
      });
      setTimeout(() => {
        setExtractQueues((state) => {
          return {
            ...state,
            [options.placement!]: state[options.placement!].filter((item) => item.uniqueId !== options.uniqueId),
          };
        });
        options.onClose!();
      }, options.duration);

      return options.uniqueId!;
    },
    [defaultOptions]
  );

  const destroy = useCallback((id: string) => {
    if (id) {
      setExtractQueues((state) => {
        state.top = state.top.filter((item) => item.uniqueId !== id);
        state.center = state.center.filter((item) => item.uniqueId !== id);
        state.bottom = state.bottom.filter((item) => item.uniqueId !== id);
        return state;
      });
    } else {
      setExtractQueues({ top: [], center: [], bottom: [] });
    }
  }, []);

  useEffect(() => {
    _unsafeToastEnabled.status = globalize;
    if (!globalize) {
      return () => {
        _unsafeToastEventEmitter.removeListener('open', open);
        _unsafeToastEventEmitter.removeListener('destroy', destroy);
      };
    }
    _unsafeToastEventEmitter.addListener('open', open);
    _unsafeToastEventEmitter.addListener('destroy', destroy);

    return () => {
      _unsafeToastEventEmitter.removeListener('open', open);
      _unsafeToastEventEmitter.removeListener('destroy', destroy);
    };
  }, [defaultOptions, open, globalize]);

  return (
    <ToastContext.Provider value={{ open, destroy }}>
      {children}
      <ToastGroupComponent toasts={extractQueues.top} placement={'top'} />
      <ToastGroupComponent toasts={extractQueues.center} placement={'center'} />
      <ToastGroupComponent toasts={extractQueues.bottom} placement={'bottom'} />
    </ToastContext.Provider>
  );
};
