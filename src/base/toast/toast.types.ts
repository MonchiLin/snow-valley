import type { ReactNode } from 'react';

export interface ToastOptions {
  // 信息
  message: ReactNode | string;
  // 持续时间
  duration?: number;
  // 在点击时自动关闭
  closeOnClick?: boolean;
  // 关闭回调
  onClose?: () => void;
  // 位置
  placement?: 'top' | 'center' | 'bottom';
  // 唯一 id, 不传入则使用时间戳+随机数
  uniqueId?: string;
  // 参考 ant design 的 message api
  type?: 'info' | 'success' | 'error' | 'warning' | 'loading';
}

// 此方法依赖于特定基座的实现, 例如在 vue 中可以是 jsx 或者模板, react 中可以是 React Node, 为了更好的类型提醒,
// 基座基础库不提供 useAppToastContext
export interface ToastInterface {
  open(options: ToastOptions): string;

  destroy(id?: string): void;
}
