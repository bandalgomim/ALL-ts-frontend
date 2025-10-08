/*import React, { createContext, useReducer, useMemo } from 'react';
import { PostReducer, initialteamRes } from '../reducsers/apiReducer';

export const useTeamState, useTeamActions = createContext();

export function TeamProvider({ children }) {
  const [teamRes, setTeamRes] = useReducer(PostReducer, initialteamRes);

  const value = useMemo(() => ({ teamRes, setTeamRes }), [teamRes]);

  return (
    <useTeamState, useTeamActions.Provider value={value}>
      {children}
    </useTeamState, useTeamActions.Provider>
  );
}*/
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { PostReducer, initialteamRes } from '../reducers/apiReducer';

// 1) 컨텍스트 두 개
const TeamStateContext = createContext(null);
const TeamActionsContext = createContext(null);

export function TeamProvider({ children }) {
  const [teamRes, dispatch] = useReducer(PostReducer, initialteamRes);

  // 상태 컨텍스트: teamRes 바뀔 때만 갱신
  const stateValue = useMemo(() => teamRes, [teamRes]);

  // 액션 컨텍스트: 참조 고정 (dispatch는 React가 동일 참조 보장)
  const actionsValue = useMemo(
    () => ({
      setTeamRes: dispatch, // 그대로 노출하거나 래핑해도 됨
    }),
    []
  );

  return (
    <TeamStateContext.Provider value={stateValue}>
      <TeamActionsContext.Provider value={actionsValue}>
        {children}
      </TeamActionsContext.Provider>
    </TeamStateContext.Provider>
  );
}

// 훅
export const useTeamState = () => {
  const ctx = useContext(TeamStateContext);
  if (!ctx) throw new Error('useTeamState must be used within TeamProvider');
  return ctx;
};

export const useTeamActions = () => {
  const ctx = useContext(TeamActionsContext);
  if (!ctx) throw new Error('useTeamActions must be used within TeamProvider');
  return ctx;
};