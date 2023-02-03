import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { ToastContext } from './toast.context';
import type { ToastOptions } from './toast.types';
import { _unsafeEventEmitter } from '../../escape-hatch/toast';
import { ToastGroup } from './toast.component';

type Props = {
  children: ReactNode;
  defaultOptions?: Omit<ToastOptions, 'message' | 'uniqueId'>;
};
export const ToastProvider = ({ children, defaultOptions }: Props) => {
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
            [options.placement!]: state[options.placement!].filter(
              (item) => item.uniqueId !== options.uniqueId
            ),
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
    _unsafeEventEmitter.addListener('open', open);
    _unsafeEventEmitter.addListener('destroy', destroy);

    return () => {
      _unsafeEventEmitter.removeListener('open', open);
      _unsafeEventEmitter.removeListener('destroy', destroy);
    };
  }, [defaultOptions, open]);

  return (
    <ToastContext.Provider value={{ open, destroy }}>
      {children}
      <ToastGroup toasts={extractQueues.top} placement={'top'} />
      <ToastGroup toasts={extractQueues.center} placement={'center'} />
      <ToastGroup toasts={extractQueues.bottom} placement={'bottom'} />
    </ToastContext.Provider>
  );
};
