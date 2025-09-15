import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export function refetchHook(refetch: () => Promise<any> | void) {
  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);
  const inFlight = useRef(false);

  const run = useCallback(() => {
    if (inFlight.current) return;
    inFlight.current = true;
    Promise.resolve(refetch()).finally(() => { inFlight.current = false; });
  }, [refetch]);

  // 1) 화면 포커스될 때마다 (초기 진입 포함)
  useFocusEffect(
    useCallback(() => {
      run();
      return () => {}; // 필요 시 진행 중 요청 취소
    }, [run])
  );

  // 2) 백→포어 전환 시, 이 화면이 포커스 상태라면
  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      const wasBg = /inactive|background/.test(appState.current);
      appState.current = next;
      if (wasBg && next === 'active' && isFocused) run();
    });
    return () => sub.remove();
  }, [isFocused, run]);
}
