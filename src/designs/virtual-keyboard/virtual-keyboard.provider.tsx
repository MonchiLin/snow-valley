import { PropsWithChildren, useCallback, useState } from 'react';
import { VirtualKeyboardContext } from './virtual-keyboard.context';
import { VirtualNumericKeyboard } from './virtual-keyboard';

export function VirtualKeyboardProvider(props: PropsWithChildren<{}>) {
  const [visible, setVisible] = useState(false);

  const onVisibleChanged = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <VirtualKeyboardContext.Provider value={{ visible, show, hide }}>
      {props.children}
      <VirtualNumericKeyboard visible={visible} onVisibleChanged={onVisibleChanged} />
    </VirtualKeyboardContext.Provider>
  );
}
