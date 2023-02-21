import type { ToastInterface, ToastOptions } from '../base';
import { EventEmitter } from 'eventemitter3';

export const _unsafeToastEventEmitter = new EventEmitter<'open' | 'destroy'>();
// 是否启用了全局 Toast
export const _unsafeToastEnabled = { status: false };

export const Toast: ToastInterface = {
  open: (options: ToastOptions) => {
    if (!_unsafeToastEnabled.status) {
      throw new Error('You must enable Globalize Toast first. like <ToastProvider globalize></ToastProvider>');
    }
    options.uniqueId = new Date().getTime().toString();
    _unsafeToastEventEmitter.emit('open', options);
    return options.uniqueId;
  },
  destroy: (id?: string) => {
    if (!_unsafeToastEnabled.status) {
      throw new Error('You must enable Globalize Toast first. like <ToastProvider globalize></ToastProvider>');
    }
    _unsafeToastEventEmitter.emit('destroy', id);
  },
};
