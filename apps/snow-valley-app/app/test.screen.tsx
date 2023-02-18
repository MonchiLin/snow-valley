import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    Animated.timing(animatedValue, {
      toValue: darkTheme ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [darkTheme ? '#1c1c1c' : '#e3e3e3', darkTheme ? '#e3e3e3' : '#1c1c1c'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <TouchableWithoutFeedback onPress={toggleTheme}>
        <View style={styles.themeSwitcher}>
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [
                  {
                    translateX: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 25],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.text}>Theme switcher</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeSwitcher: {
    width: 50,
    height: 25,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: '#FFF',
    marginTop: 20,
  },
});

export default App;
