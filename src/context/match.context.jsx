import React, { createContext, useReducer, useMemo } from 'react';
import { PostReducer, initialmatchRes } from '../reducsers/apiReducer';

export const MatchContext = createContext();

export function MatchProvider({ children }) {
  const [matchRes, setMatchRes] = useReducer(PostReducer, initialmatchRes);

  const value = useMemo(() => ({ matchRes, setMatchRes }), [matchRes]);

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  );
}