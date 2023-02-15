import { Button, Text, View } from 'react-native';
import { Ripple } from 'snow-valley';

export default function RippleScreen() {
  return (
    <View className={'flex-1'}>
      <Ripple>
        <Button title={'asdasd'} />
      </Ripple>
      <Ripple>
        <View className={'py-4 w-full'}>
          <Text>A Loooooooooooooooooooooooooong Text</Text>
        </View>
      </Ripple>
    </View>
  );
}
