import { Button, StyleSheet, View } from 'react-native';
import { TextInputVirtualKeyboard } from 'snow-valley-ui';
import { useState } from 'react';

const styles = StyleSheet.create({
  boxContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    padding: 10,
    fontSize: 18,
    color: '#444',
    width: '100%',
  },
});

export default function VirtualKeyboardScreen() {
  const [value, setValue] = useState('');

  return (
    <View style={{ alignItems: 'flex-start', backgroundColor: 'white', flex: 1 }}>
      <View style={styles.boxContainer}>
        <TextInputVirtualKeyboard
          style={styles.input}
          placeholder={'place input a number'}
          value={value}
          onChangeText={setValue}
        />
      </View>

      <View style={styles.boxContainer}>
        <TextInputVirtualKeyboard
          keyboardType={'decimal-pad'}
          style={styles.input}
          placeholder={'place input a number'}
          value={value}
          onChangeText={setValue}
        />
      </View>

      <Button onPress={() => setValue(new Date().getTime().toString())} title={'改变 Value'} />
    </View>
  );
}
