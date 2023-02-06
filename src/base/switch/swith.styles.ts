import { StyleSheet } from 'react-native';

/**
 * 组件结构
 * Switch
 * - handler (绝对定位)
 */

export default StyleSheet.create({
  // switch 本身的样式
  switch: {
    position: 'relative',
    alignItems: 'center',
  },
  inner: {
    position: 'relative',
    top: 2,
    width: 44,
    height: 16,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  // switch 内部圆形 box 的样式
  handler: {
    position: 'absolute',
    borderRadius: 999,
    width: 22,
    height: 22,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 1,
    top: 0,
  },
});
