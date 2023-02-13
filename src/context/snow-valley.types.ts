import type { ReactNode } from 'react';
import type { DEFAULT_SAFE_AREA_INSETS } from '../constants/safe-area';

export interface LonelySnowValleyProps {
  children: ReactNode;
  safeAreaInsets?: typeof DEFAULT_SAFE_AREA_INSETS;
  isDarkMode?: boolean;
}

export interface SnowValleyProps extends LonelySnowValleyProps {}
