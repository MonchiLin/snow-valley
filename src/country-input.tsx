import { Text, TouchableOpacity, View } from 'react-native';
import {
  SelectableInput,
  SelectableInputSwitchView,
} from './base/selectable-input';
import { MaterialIcons } from '@expo/vector-icons';

export type Country = {
  name: string;
  code: string;
  flag: string;
};

export const CountryInput = (props: {
  country: Country | null;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <SelectableInput
        onPress={props.onPress}
        label={'Country'}
        focused={props.country !== null}
      >
        <>
          <SelectableInputSwitchView identifier={props.country?.name}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{props.country?.flag}</Text>
              <Text style={{ paddingLeft: 10 }}>{props.country?.name}</Text>
            </View>
          </SelectableInputSwitchView>

          <View style={{ flex: 1 }} />
          <MaterialIcons
            name="arrow-forward-ios"
            size={12}
            color={props.country ? '#64A0E8' : '#A8A8A8'}
          />
        </>
      </SelectableInput>
    </TouchableOpacity>
  );
};
