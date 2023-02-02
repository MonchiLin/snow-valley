import {
  DEFAULT_COMPONENT,
  DEFAULT_TOKEN,
  replaceComponentVariable,
} from '../constants/theme';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export const ThemeContext = createContext({
  token: DEFAULT_TOKEN,
  component: DEFAULT_COMPONENT,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [token] = useState(DEFAULT_TOKEN);
  const [component] = useState(DEFAULT_COMPONENT);

  const _component = useMemo(() => {
    return replaceComponentVariable(component, token);
  }, [token, component]);

  return (
    <ThemeContext.Provider value={{ token: token, component: _component }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
