import { Text, TextInput, View } from 'react-native';
import { SelectableInput } from './base/selectable-input';
import { useRef } from 'react';

export type PhoneNumberInputProps = {
  code: string;
  phoneNumber: string;
  onCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
};

export const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const codeInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);

  const onCodeChange = (value: string) => {
    if (value.length >= 3) {
      phoneNumberInputRef.current?.focus();
    }
    props.onCodeChange(value);
  };

  return (
    <SelectableInput
      focused={
        codeInputRef.current?.isFocused() ||
        phoneNumberInputRef.current?.isFocused()
      }
      label={'Phone number'}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>+</Text>
        <TextInput
          keyboardType={'number-pad'}
          style={{ minWidth: 30 }}
          ref={codeInputRef}
          autoFocus
          value={props.code}
          onChangeText={onCodeChange}
        />
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <Text>|</Text>
      </View>
      <TextInput
        placeholder={'Phone number'}
        style={{ flex: 1 }}
        ref={phoneNumberInputRef}
        value={props.phoneNumber}
        onChangeText={props.onPhoneNumberChange}
      />
    </SelectableInput>
  );
};
