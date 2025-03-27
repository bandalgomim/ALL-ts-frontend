import React, { createContext, useReducer, useState } from 'react';
import { PostReducer, initialmainReq, initialteamReq, initialLeagueReq, initialmatchReq, initialIsSelectedReq, initialRes } from '../reducsers/apiReducer';

export const ApiContext = createContext();


export function ApiProvider({ children }) {
  const [mainReq, setMainReq] = useReducer(PostReducer, initialmainReq);
  const [teamReq, setTeamReq] = useReducer(PostReducer, initialteamReq);
  const [leagueReq, setLeagueReq] = useReducer(PostReducer, initialLeagueReq);
  const [matchReq, setMatchReq] = useReducer(PostReducer, initialmatchReq);
  const [isSelectedReq, setIsSelectedReq] = useReducer(PostReducer, initialIsSelectedReq);

  const [mainRes, setMainRes] = useState(initialRes);
  const [teamRes, setTeamRes] = useState(initialRes);
  const [leagueRes, setLeagueRes] = useState(initialRes);
  const [matchRes, setMatchRes] = useState(initialRes);
  const [isSelectedRes, setIsSelectedRes] = useState(initialRes);

  return (
    <ApiContext.Provider value={{
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
      mainRes,
      setMainRes,
      teamRes,
      setTeamRes,
      leagueRes,
      setLeagueRes,
      matchRes,
      setMatchRes,
      isSelectedRes,
      setIsSelectedRes,
      }}>
      {children}
    </ApiContext.Provider>
  );
}
