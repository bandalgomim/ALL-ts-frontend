import React, { createContext, useReducer, useMemo } from 'react';
import { PostReducer, initialLeagueRes } from '../reducsers/apiReducer';

export const LeagueContext = createContext();

export function LeagueProvider({ children }) {
  const [leagueRes, setLeagueRes] = useReducer(PostReducer, initialLeagueRes);

  const value = useMemo(() => ({ leagueRes, setLeagueRes }), [leagueRes]);

  return (
    <LeagueContext.Provider value={value}>
      {children}
    </LeagueContext.Provider>
  );
}