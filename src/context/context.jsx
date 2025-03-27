import React, { createContext, useReducer } from 'react';
import { PostReducer, initialmain, initialteam, initialLeague, initialmatch, initialIsSelected } from '../reducsers/apiReducer';

export const ApiContext = createContext();


export function ApiProvider({ children }) {
  const [main, setMain] = useReducer(PostReducer, initialmain);
  const [team, setTeam] = useReducer(PostReducer, initialteam);
  const [league, setLeague] = useReducer(PostReducer, initialLeague);
  const [match, setMatch] = useReducer(PostReducer, initialmatch);
  const [isSelected, setIsSelected] = useReducer(PostReducer, initialIsSelected);
  return (
    <ApiContext.Provider value={{
      main,
      setMain,
      team,
      setTeam,
      league,
      setLeague,
      match,
      setMatch,
      isSelected,
      setIsSelected,
      }}>
      {children}
    </ApiContext.Provider>
  );
}
