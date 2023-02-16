import { Button, Keyboard, StyleSheet, View } from 'react-native';
import {
  Country,
  CountryGroup,
  CountryInput,
  NightModeIndicatorRipple,
  PhoneNumberInput,
  useSnowValley,
  useSnowValleyTokens,
} from 'snow-valley-ui';
import { useState } from 'react';

// https://emojipedia.org/flags/
const countries = new CountryGroup([
  new Country({
    name: 'Chinese mainland',
    code: '86',
    flag: '🇨🇳',
    placeholder: '000 0000 000',
  }),
  new Country({
    name: 'United States',
    code: '1',
    flag: '🇺🇸',
    placeholder: '000 000 0000',
  }),
  new Country({
    name: 'Chinese mainland',
    code: '12',
    flag: '🇨🇳',
    placeholder: '000 0000 000',
  }),
]);

export default function SignInScreen() {
  const snowValley = useSnowValley();
  const tokens = useSnowValleyTokens();
  const [country, setCountry] = useState<Country | null>(null);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onPress = () => {
    setCountry(countries.indexOf(0)!);
  };
  const onPress1 = () => {
    setCountry(countries.indexOf(1)!);
  };

  const onPress2 = () => {
    setCountry(null);
    setCode('');
  };

  const onCodeChange = (e: string) => {
    if (e) {
      const nextCountry = countries.findCountryByCode(e);
      if (nextCountry) {
        setCountry(nextCountry);
      } else {
        setCountry(null);
      }
    } else {
      setCountry(null);
    }
    setCode(e);
  };

  const onPhoneNumberChange = (e: string) => {
    setPhoneNumber(e);
  };

  const hiddenKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.boxContainer, { backgroundColor: tokens.backgroundPrimaryColor }]}>
      <CountryInput country={country} />
      <View style={{ height: 20 }} />
      <PhoneNumberInput
        code={code}
        phoneNumber={phoneNumber}
        onPhoneNumberChange={onPhoneNumberChange}
        onCodeChange={onCodeChange}
      />
      {/*<NightModeIndicator defaultIsNight={false} />*/}
      <NightModeIndicatorRipple onAnimationFinish={snowValley.toggleTheme} defaultIsNight={false} />
      <Button title={'设置中国'} onPress={onPress} />
      <Button title={'设置 US'} onPress={onPress1} />
      <Button title={'清除'} onPress={onPress2} />
      <Button title={'隐藏键盘'} onPress={hiddenKeyboard} />
      <View style={{ height: 50 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    position: 'relative',
  },
});
