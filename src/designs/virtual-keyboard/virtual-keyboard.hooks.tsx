import { useEffect, useRef } from 'react';

/**
 * 虚拟键盘的 backspace 按钮的逻辑
 * 这个逻辑是为了模拟真实的键盘的 backspace 按钮的逻辑
 * 1. 单击 backspace 按钮，删除一个字符
 * 2. 按住 backspace 按钮超过 2 秒后, 开始删除字符, 并且删除字符的速度越来越快
 *
 * 他会返回两个函数
 * 1. handleBackspacePressIn: 按下 backspace 按钮的时候调用
 * 2. handleBackspacePressOut: 松开 backspace 按钮的时候调用
 * 3. handleBackspacePress: 完成一次 backspace 按钮的时候调用
 *
 * handleBackspacePressIn 需要传入两个参数 text 和 setText, 然后在合适的时机慢慢从最后一个字符开始减少字符
 * handleBackspacePressOut 终止定时器, 并且清除临时变量
 * handleBackspacePress 完成一次 backspace 按钮的时候调用
 * 要将 handleBackspacePress 和 handleBackspacePressIn 逻辑区分, 如果 handleBackspacePressIn 触发 800ms 之后触发了 handleBackspacePress 就不需要执行 handleBackspacePressIn 之后的逻辑了
 */
export const useBackspace = () => {
  const task = useRef({
    firstDelay: null as any,
    deleteTimer: null as any,
    speed: 300,
    value: '',
  });

  useEffect(() => {
    return () => {
      clearTimeout(task.current.firstDelay);
      clearTimeout(task.current.deleteTimer);
    };
  }, []);

  const handleBackspacePressIn = (text: string, setText: (text: string) => void) => {
    if (!text) {
      return;
    }
    task.current.speed = 300;
    task.current.value = text;

    task.current.firstDelay = setTimeout(() => {
      const fn = () => {
        task.current.value = task.current.value.slice(0, -1);
        setText(task.current.value);
        task.current.speed = task.current.speed > 50 ? task.current.speed - 100 : 50;
        task.current.deleteTimer = setTimeout(fn, task.current.speed);
      };
      fn();
    }, 300);

    task.current.value = task.current.value.slice(0, -1);
    setText(task.current.value);
  };

  const handleBackspacePressOut = () => {
    clearTimeout(task.current.firstDelay);
    clearTimeout(task.current.deleteTimer);
  };

  const handleBackspacePress = () => {};

  return { handleBackspacePressIn, handleBackspacePressOut, handleBackspacePress };
};
