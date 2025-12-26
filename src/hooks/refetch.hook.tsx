/* eslint-disable react-hooks/rules-of-hooks */
// hookRefetch.ts
import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAMPageParamList } from '@model/navigation.dto';
import { hookIsLogin } from './IAM.hook';

type LoadingAction = { type: 'LOADING' };

export function hookRefetch(
  refetch: () => Promise<any> | void,
  hookPageState: (action: LoadingAction) => void
) {
  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);
  const inFlight = useRef(false);
  const isMounted = useRef(true);

  const navigation = useNavigation<StackNavigationProp<IAMPageParamList>>();
  const navigateIAM = useCallback(() => {
    navigation.replace('IAMScreen', { state: true });
  }, [navigation]);

  const run = useCallback(() => {
    hookIsLogin(navigateIAM);
    if (inFlight.current || !isMounted.current) return;
    inFlight.current = true;
    Promise.resolve(refetch()).finally(() => {
      inFlight.current = false;
    });
  }, [refetch, navigateIAM]);

  // 1) 포커스될 때 호출, 포커스 해제(blur)될 때 LOADING로 되돌리기
  useFocusEffect(
    useCallback(() => {
      run();
      return () => {
        hookPageState({ type: 'LOADING' });// debounce
           // ✅ blur 시점
        if (!isMounted.current) return;
        
      };
    }, [run, hookPageState])
  );

  // 2) 화면을 떠나기 직전(beforeRemove)에도 실행 (뒤로가기/replace 등)
  useEffect(() => {
    const sub = navigation.addListener('beforeRemove', () => {
      hookPageState({ type: 'LOADING' });
      if (!isMounted.current) return;
           // ✅ 네비게이션 이탈 직전
    });
    return sub;
  }, [navigation, hookPageState]);

  // 3) 백그라운드→포어그라운드 복귀 시, 이 화면이 포커스라면 재요청
  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      const wasBg = /inactive|background/.test(appState.current);
      appState.current = next;
      if (wasBg && next === 'active' && isFocused) run();
    });
    return () => sub.remove();
  }, [isFocused, run]);

  // 4) 언마운트 시점 가드 및 마지막 정리
  useEffect(() => {
    return () => {
      hookPageState({ type: 'LOADING' });
      isMounted.current = false;
      // 언마운트 도중 setState 경고 방지: isMounted 가드로 이미 보호
      
    };
  }, [hookPageState]);
}
