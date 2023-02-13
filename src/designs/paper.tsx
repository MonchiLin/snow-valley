import { View } from 'react-native';
import { useSnowValley } from 'snow-valley';

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
