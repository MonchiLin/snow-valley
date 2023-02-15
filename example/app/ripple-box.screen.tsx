import { Button, Text, View } from 'react-native';
import { RippleBox } from 'snow-valley';

export default function RippleBoxScreen() {
  return (
    <View className={'flex-1'}>
      <RippleBox>
        <Button title={'asdasd'} />
      </RippleBox>
      <RippleBox>
        <View className={'py-4 w-full bg-amber-100'}>
          <Text>A Loooooooooooooooooooooooooong Text</Text>
        </View>
      </RippleBox>
    </View>
  );
}
