import { Button, View } from 'react-native';
import { Toast, useToast } from 'snow-valley-ui';

export default function ToastScreen() {
  const toast = useToast();

  return (
    <View style={{ alignItems: 'flex-start' }}>
      <Button
        onPress={() =>
          toast.open({
            message: 'Hello World',
            closeOnClick: true,
            duration: 2000,
            type: 'success',
          })
        }
        title={'Success'}
      />
      <Button
        onPress={() => toast.open({ message: 'Hello World', duration: 2000, type: 'warning' })}
        title={'Warning'}
      />
      <Button
        onPress={() => toast.open({ message: 'Hello World', duration: 2000, type: 'info' })}
        title={'Info'}
      />
      <Button
        onPress={() => toast.open({ message: 'Hello World', duration: 2000, type: 'error' })}
        title={'Error'}
      />
      <Button
        onPress={() => Toast.open({ message: 'Hello World', duration: 2000, type: 'success' })}
        title={'Static Success'}
      />
      <Button
        onPress={() => Toast.open({ message: 'Hello World', duration: 2000, type: 'warning' })}
        title={'Static Warning'}
      />
      <Button
        onPress={() => Toast.open({ message: 'Hello World', duration: 2000, type: 'info' })}
        title={'StaticInfo'}
      />
      <Button
        onPress={() => Toast.open({ message: 'Hello World', duration: 2000, type: 'error' })}
        title={'Static Error'}
      />
    </View>
  );
}
