import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  group: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  toastTopMargin: {
    marginTop: 15,
  },
  toastBottomMargin: {
    marginBottom: 15,
  },
  toastWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 6,
  },
  toast: {
    backgroundColor: 'white',
  },
  toastIcon: {
    marginRight: 12,
  },
});
