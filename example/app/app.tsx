import { SnowValley } from 'snow-valley-ui';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './sign-in.screen';
import ToastScreen from './toast.screen';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import SwitchScreen from './switch.screen';
import { PortalProvider } from '@gorhom/portal';
import VirtualKeyboardScreen from './virtual-keyboard.screen';
import TestScreen from './test.screen';
import RippleBoxScreen from './ripple-box.screen';
import { ThemeSwitcherRippleProvider } from 'snow-valley-ui-skia/designs';
import { mtprotoApp } from './mt-proto';
import WebviewCrypto from 'react-native-webview-crypto';

const Stack = createNativeStackNavigator();

function Navigation() {
  const safeArea = useSafeAreaInsets();

  useEffect(() => {
    mtprotoApp
      .call('help.countriesList')
      .then((result) => {
        console.log('country:', result.country);
      })
      .catch((err) => {
        console.log('err:', err);
      });
    mtprotoApp
      .call('users.getFullUser', {
        id: {
          _: 'inputUserSelf',
        },
      })
      .then((result) => {
        console.log('users.getFullUser:', result.country);
      })
      .catch((err) => {
        console.log('users.getFullUser err:', err);
      });
  }, []);

  return (
    <SnowValley safeAreaInsets={safeArea}>
      <ThemeSwitcherRippleProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'SignIn'}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Toast" component={ToastScreen} />
            <Stack.Screen name="Switch" component={SwitchScreen} />
            <Stack.Screen name="VirtualKeyboard" component={VirtualKeyboardScreen} />
            <Stack.Screen name="RippleBox" component={RippleBoxScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeSwitcherRippleProvider>
    </SnowValley>
  );
}

export default function Entry() {
  return (
    <PortalProvider>
      <WebviewCrypto />
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </PortalProvider>
  );
}
