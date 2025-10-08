import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { PostReducer, initialmainRes } from '../reducers/apiReducer';

// 1) 컨텍스트 두 개
const MainStateContext = createContext(null);
const MainActionsContext = createContext(null);

export function MainProvider({ children }) {
  const [mainRes, dispatch] = useReducer(PostReducer, initialmainRes);

  // 상태 컨텍스트: mainRes 바뀔 때만 갱신
  const stateValue = useMemo(() => mainRes, [mainRes]);

  // 액션 컨텍스트: 참조 고정 (dispatch는 React가 동일 참조 보장)
  const actionsValue = useMemo(
    () => ({
      setMainRes: dispatch, // 그대로 노출하거나 래핑해도 됨
    }),
    []
  );

  return (
    <MainStateContext.Provider value={stateValue}>
      <MainActionsContext.Provider value={actionsValue}>
        {children}
      </MainActionsContext.Provider>
    </MainStateContext.Provider>
  );
}

// 훅
export const useMainState = () => {
  const ctx = useContext(MainStateContext);
  if (!ctx) throw new Error('useMainState must be used within MainProvider');
  return ctx;
};

export const useMainActions = () => {
  const ctx = useContext(MainActionsContext);
  if (!ctx) throw new Error('useMainActions must be used within MainProvider');
  return ctx;
};