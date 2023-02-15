import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  group: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  toastTopMargin: {
    marginTop: 10,
  },
  toastBottomMargin: {
    marginBottom: 10,
  },
  toastWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
  toast: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
  toastIcon: {
    marginRight: 12,
  },
});
