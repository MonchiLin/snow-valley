import { createContext, useContext } from 'react';
import type { VirtualKeyboardContextType } from './virtual-keyboard.types';

export const VirtualKeyboardContext = createContext<VirtualKeyboardContextType>(null as any);

export const useVirtualKeyboard = () => {
  return useContext(VirtualKeyboardContext);
};
