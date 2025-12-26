import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { PostReducer, initialmatchRes } from '../reducers/apiReducer';

// 1) 컨텍스트 두 개
const MatchStateContext = createContext(null);
const MatchActionsContext = createContext(null);

export function MatchProvider({ children }) {
  const [matchRes, dispatch] = useReducer(PostReducer, initialmatchRes);

  // 상태 컨텍스트: matchRes 바뀔 때만 갱신
  const stateValue = useMemo(() => matchRes, [matchRes]);

  // 액션 컨텍스트: 참조 고정 (dispatch는 React가 동일 참조 보장)
  const actionsValue = useMemo(
    () => ({
      setMatchRes: dispatch, // 그대로 노출하거나 래핑해도 됨
    }),
    []
  );

  return (
    <MatchStateContext.Provider value={stateValue}>
      <MatchActionsContext.Provider value={actionsValue}>
        {children}
      </MatchActionsContext.Provider>
    </MatchStateContext.Provider>
  );
}

// 훅
export const useMatchState = () => {
  const ctx = useContext(MatchStateContext);
  if (!ctx) {throw new Error('useMatchState must be used within MatchProvider');}
  return ctx;
};

export const useMatchActions = () => {
  const ctx = useContext(MatchActionsContext);
  if (!ctx) {throw new Error('useMatchActions must be used within MatchProvider');}
  return ctx;
};
