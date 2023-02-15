import { View } from 'react-native';
import { useSnowValley } from '../context/snow-valley.context';

export const Paper = () => {
  const { tokens, isDarkMode } = useSnowValley();

  return (
    <View
      style={{
        backgroundColor: tokens.backgroundPrimaryColor[isDarkMode ? 'dark' : 'light'],
        flex: 1,
      }}
    />
  );
};
