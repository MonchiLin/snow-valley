import { useCallback, useLayoutEffect, useRef } from 'react';

export function useEvent<T extends Function>(handler: T) {
  const handlerRef = useRef<Function | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: unknown[]) => {
    const fn = handlerRef.current!;
    return fn(...args);
  }, []);
}
