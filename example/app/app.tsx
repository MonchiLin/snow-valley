import { SnowValley, ToastProvider } from 'snow-valley';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import SignInScreen from './sign-in.screen';
import ToastScreen from './toast.screen';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import SwitchScreen from './switch.screen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const safeArea = useSafeAreaInsets();

  return (
    <SnowValley safeAreaInsets={safeArea}>
      <ToastProvider globalize>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'SignIn'}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Toast" component={ToastScreen} />
            <Stack.Screen name="Switch" component={SwitchScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SnowValley>
  );
}

export default function Entry() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
