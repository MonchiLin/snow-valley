import { View } from 'react-native';
import { Switch } from 'snow-valley';

export default function SwitchScreen() {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'column' }}>
      <View style={{ marginBottom: 10 }} />
      <Switch />
      <View style={{ marginBottom: 10 }} />
      <Switch />
    </View>
  );
}
