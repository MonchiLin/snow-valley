import { Text, TextInput, View } from 'react-native';
import { FloatingInput } from '../base/floating-input';
import { useRef, useState } from 'react';
import { useSnowValley } from '../context/snow-valley.context';
import { TextInputVirtualKeyboard } from './virtual-keyboard';

export type PhoneNumberInputProps = {
  code: string;
  phoneNumber: string;
  onCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
};

export const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const codeInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState({
    codeInput: false,
    phoneNumberInput: false,
  });
  const { componentTokens } = useSnowValley();

  const onCodeChange = (value: string) => {
    if (value.length >= 3) {
      phoneNumberInputRef.current?.focus();
    }
    props.onCodeChange(value);
  };

  const onFocus = (key: keyof typeof focused) => {
    setFocused((state) => ({ ...state, [key]: true }));
  };

  const onBlur = (key: keyof typeof focused) => {
    setFocused((state) => ({ ...state, [key]: false }));
  };

  const _focused = focused.phoneNumberInput || focused.codeInput;

  return (
    <FloatingInput
      focused={true}
      label={'Phone number'}
      labelStyle={[
        _focused
          ? { color: componentTokens.FloatingInput.focused.labelColor }
          : { color: componentTokens.FloatingInput.unFocused.labelColor },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>+</Text>
        <TextInputVirtualKeyboard
          style={{ minWidth: 60, paddingLeft: 5 }}
          ref={codeInputRef}
          value={props.code}
          onChangeText={onCodeChange}
          onFocus={() => onFocus('codeInput')}
          onBlur={() => onBlur('codeInput')}
          placeholder={'Country'}
        />
      </View>
      <View style={{ marginHorizontal: 8 }}>
        <Text>|</Text>
      </View>
      <TextInputVirtualKeyboard
        placeholder={'Phone number'}
        style={{ flex: 1 }}
        ref={phoneNumberInputRef}
        value={props.phoneNumber}
        onChangeText={props.onPhoneNumberChange}
        onFocus={() => onFocus('phoneNumberInput')}
        onBlur={() => onBlur('phoneNumberInput')}
      />
    </FloatingInput>
  );
};
