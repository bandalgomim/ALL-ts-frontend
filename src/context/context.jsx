import React, { createContext, useReducer, useState } from 'react';
import { PostReducer, initialmainRes, initialteamRes, initialLeagueRes, initialmatchRes, initialRes } from '../reducsers/apiReducer';

export const ApiContext = createContext();


export function ApiProvider({ children }) {
  const [mainRes, setMainRes] = useReducer(PostReducer, initialmainRes);
  const [teamRes, setTeamRes] = useReducer(PostReducer, initialteamRes);
  const [leagueRes, setLeagueRes] = useReducer(PostReducer, initialLeagueRes);
  const [matchRes, setMatchRes] = useReducer(PostReducer, initialmatchRes);

  const [mainReq, setMainReq] = useState(initialRes);
  const [teamReq, setTeamReq] = useState(initialRes);
  const [leagueReq, setLeagueReq] = useState(initialRes);
  const [matchReq, setMatchReq] = useState(initialRes);
  const [isSelectedReq, setIsSelectedReq] = useState(initialRes);



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
      mainReq,
      setMainReq,
      teamReq,
      setTeamReq,
      leagueReq,
      setLeagueReq,
      matchReq,
      setMatchReq,
      isSelectedReq,
      setIsSelectedReq,
      }}>
      {children}
    </ApiContext.Provider>
  );
}
