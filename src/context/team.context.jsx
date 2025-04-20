import React, { createContext, useReducer, useMemo } from 'react';
import { PostReducer, initialteamRes } from '../reducsers/apiReducer';

export const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [teamRes, setTeamRes] = useReducer(PostReducer, initialteamRes);

  const value = useMemo(() => ({ teamRes, setTeamRes }), [teamRes]);

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
}