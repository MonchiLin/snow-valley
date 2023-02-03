import { Button, View } from 'react-native';
import { useToast } from 'snow-valley';

export default function ToastScreen() {
  const toast = useToast();

  return (
    <View style={{ alignItems: 'flex-start' }}>
      <Button
        onPress={() =>
          toast.open({
            message: 'Hello World',
            closeOnClick: true,
            duration: 2000000,
            type: 'success',
          })
        }
        title={'Success'}
      />
      <Button
        onPress={() => toast.open({ message: 'Hello World', duration: 2000000, type: 'warning' })}
        title={'Warning'}
      />
      <Button
        onPress={() => toast.open({ message: 'Hello World', duration: 2000000, type: 'info' })}
        title={'Info'}
      />
      <Button
        onPress={() => toast.open({ message: 'Hello World', duration: 2000000, type: 'error' })}
        title={'Error'}
      />
    </View>
  );
}
