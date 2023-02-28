import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { AnyFunction } from '../shared-types';

export function useAppState() {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const onForegroundHandler = useRef<AnyFunction>();
  const onBackgroundHandler = useRef<AnyFunction>();

  const onForeground = (handler: AnyFunction) => {
    onForegroundHandler.current = handler;
  };

  const onBackground = (handler: AnyFunction) => {
    onBackgroundHandler.current = handler;
  };

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (nextAppState === 'active' && appState !== 'active') {
        onForegroundHandler.current?.();
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        onBackgroundHandler.current?.();
      }
      setAppState(nextAppState);
    }
    const handler = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      handler.remove();
    };
  }, [appState]);

  return { appState, onForeground, onBackground };
}

export function useAppForeground(callback: (appState: AppStateStatus) => void) {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (nextAppState === 'active' && appStateRef.current !== 'active') {
        callback(nextAppState);
      }
      appStateRef.current = nextAppState;
    }
    const handler = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      handler.remove();
    };
  }, []);

  return null;
}

export function useAppBackground(callback: (appState: AppStateStatus) => void) {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (appStateRef.current === 'active' && nextAppState.match(/inactive|background/)) {
        callback(nextAppState);
      }
      appStateRef.current = nextAppState;
    }
    const handler = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      handler.remove();
    };
  }, []);

  return null;
}
