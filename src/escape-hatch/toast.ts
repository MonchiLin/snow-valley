import type { ToastInterface, ToastOptions } from '../base';
import { EventEmitter } from 'eventemitter3';

export const _unsafeEventEmitter = new EventEmitter<'open' | 'destroy'>();

export const Toast: ToastInterface = {
  open: (options: ToastOptions) => {
    options.uniqueId = new Date().getTime().toString();
    _unsafeEventEmitter.emit('open', options);
    return options.uniqueId;
  },
  destroy: (id?: string) => {
    _unsafeEventEmitter.emit('destroy', id);
  },
};
