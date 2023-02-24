export interface ThemeSwitcherIndicatorProps {
  // 是否为夜间模式
  isNight: boolean;
  // 当动画执行完成, isNight: 是否是夜间模式
  onAnimationFinish?: (isNight: boolean) => void;
  // 当动画开始执行, isNight: 是否是夜间模式
  onAnimationStart?: (isNight: boolean) => void;
}
