import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  VirtualNumericKeyboardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1000,
  },
  VirtualNumericButtonGroup: {
    width: '100%',
    flexDirection: 'column',
  },
  VirtualNumericButtonGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  VirtualNumericButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '31%',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-between',
  },
  VirtualNumericButtonGroupNumber: {
    color: '#262626',
    fontSize: 20,
  },
  VirtualNumericButtonGroupHit: {
    color: '#aaaaaa',
    fontSize: 16,
  },
  VirtualNumericBottomGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
