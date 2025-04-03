import React, { createContext, useReducer, useState } from 'react';
import { PostReducer, initialmainRes, initialteamRes, initialLeagueRes, initialmatchRes } from '../reducsers/apiReducer';

export const ApiContext = createContext();


export function ApiProvider({ children }) {
  const [mainRes, setMainRes] = useReducer(PostReducer, initialmainRes);
  const [teamRes, setTeamRes] = useReducer(PostReducer, initialteamRes);
  const [leagueRes, setLeagueRes] = useReducer(PostReducer, initialLeagueRes);
  const [matchRes, setMatchRes] = useReducer(PostReducer, initialmatchRes);
  const [login, setLogin] = useState(false)



  return (
    <ApiContext.Provider value={{
      mainRes,
      setMainRes,
      teamRes,
      setTeamRes,
      leagueRes,
      setLeagueRes,
      matchRes,
      setMatchRes,
      login,
      setLogin,
      }}>
      {children}
    </ApiContext.Provider>
  );
}
