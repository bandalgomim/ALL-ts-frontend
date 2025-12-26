import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { PostReducer, initialLeagueRes } from '../reducers/apiReducer';

// 1) 컨텍스트 두 개
const LeagueStateContext = createContext(null);
const LeagueActionsContext = createContext(null);

export function LeagueProvider({ children }) {
  const [leagueRes, dispatch] = useReducer(PostReducer, initialLeagueRes);

  // 상태 컨텍스트: leagueRes 바뀔 때만 갱신
  const stateValue = useMemo(() => leagueRes, [leagueRes]);

  // 액션 컨텍스트: 참조 고정 (dispatch는 React가 동일 참조 보장)
  const actionsValue = useMemo(
    () => ({
      setLeagueRes: dispatch, // 그대로 노출하거나 래핑해도 됨
    }),
    []
  );

  return (
    <LeagueStateContext.Provider value={stateValue}>
      <LeagueActionsContext.Provider value={actionsValue}>
        {children}
      </LeagueActionsContext.Provider>
    </LeagueStateContext.Provider>
  );
}

// 훅
export const useLeagueState = () => {
  const ctx = useContext(LeagueStateContext);
  if (!ctx) {throw new Error('useLeagueState must be used within LeagueProvider');}
  return ctx;
};

export const useLeagueActions = () => {
  const ctx = useContext(LeagueActionsContext);
  if (!ctx) {throw new Error('useLeagueActions must be used within LeagueProvider');}
  return ctx;
};
