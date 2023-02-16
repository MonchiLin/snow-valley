import { Button, Text, View } from 'react-native';
import { RippleBox } from 'snow-valley-ui';

export default function RippleBoxScreen() {
  return (
    <View>
      <RippleBox>
        <Button title={'asdasd'} />
      </RippleBox>
      <RippleBox>
        <View>
          <Text>A Loooooooooooooooooooooooooong Text</Text>
        </View>
      </RippleBox>
    </View>
  );
}
