import type { ToastInterface } from './toast.types';
import { createContext, useContext } from 'react';

export const ToastContext = createContext<ToastInterface>(null as any);

export const useToast = () => useContext(ToastContext);
