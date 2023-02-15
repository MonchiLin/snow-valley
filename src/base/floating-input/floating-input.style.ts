import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    position: 'relative',
    height: 45,
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    left: 8,
  },
});
