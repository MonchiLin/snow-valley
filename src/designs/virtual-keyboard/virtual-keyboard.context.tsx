import { createContext, useContext } from 'react';

export const VirtualKeyboardContext = createContext({
  visible: false,
  show: () => {},
  hide: () => {},
});

export const useVirtualKeyboard = () => {
  return useContext(VirtualKeyboardContext);
};
