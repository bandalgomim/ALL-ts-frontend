import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export function useRefetchOnAppForeground(refetch: () => void) {
  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', nextState => {
      const wasBg = /inactive|background/.test(appState.current);
      if (wasBg && nextState === 'active' && isFocused) {
        refetch(); // ✅ 이 화면이 현재 focus일 때만 실행
      }
      appState.current = nextState;
    });

    return () => sub.remove();
  }, [isFocused, refetch]);
}