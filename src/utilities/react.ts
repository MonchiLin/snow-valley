/**
 * 判断是否为 React Native 可点击组件
 */
export function isTouchableComponent(componentName: string): boolean {
  return [
    'TouchableOpacity',
    'TouchableWithoutFeedback',
    'TouchableHighlight',
    'TouchableNativeFeedback',
    'Pressable',
  ].includes(componentName);
}
