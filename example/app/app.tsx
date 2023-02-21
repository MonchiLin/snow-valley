import { SnowValley } from 'snow-valley-ui';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './sign-in.screen';
import ToastScreen from './toast.screen';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React from 'react';
import SwitchScreen from './switch.screen';
import { PortalProvider } from '@gorhom/portal';
import VirtualKeyboardScreen from './virtual-keyboard.screen';

import TestScreen from './test.screen';
import RippleBoxScreen from './ripple-box.screen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const safeArea = useSafeAreaInsets();

  return (
    <SnowValley safeAreaInsets={safeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'SignIn'}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Toast" component={ToastScreen} />
          <Stack.Screen name="Switch" component={SwitchScreen} />
          <Stack.Screen
            name="VirtualKeyboard"
            component={VirtualKeyboardScreen}
          />
          <Stack.Screen name="RippleBox" component={RippleBoxScreen} />
          <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SnowValley>
  );
}

export default function Entry() {
  return (
    <PortalProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </PortalProvider>
  );
}
