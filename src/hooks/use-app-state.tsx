import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState() {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const onForegroundHandler = useRef<Function>();
  const onBackgroundHandler = useRef<Function>();

  const onForeground = (handler: Function) => {
    onForegroundHandler.current = handler;
  };

  const onBackground = (handler: Function) => {
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
