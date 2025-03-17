import React, { createContext, useReducer } from "react";
import { PostReducer, initialmain, initialteam, initialLeague, initialmatch, initialIsTeamSelected, initialIsLeagueSelected } from "../reducsers/apiReducer";

export const ApiContext = createContext();


export function ApiProvider({ children }) {
  const [main, setMain] = useReducer(PostReducer, initialmain);
  const [team, setTeam] = useReducer(PostReducer, initialteam);
  const [league, setLeague] = useReducer(PostReducer, initialLeague);
  const [match, setMatch] = useReducer(PostReducer, initialmatch);
  const [isTeamSelected, setIsTeamSelected] = useReducer(PostReducer, initialIsTeamSelected);
  const [isLeagueSelected, setIsLeagueSelected] = useReducer(PostReducer, initialIsLeagueSelected);
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
      isTeamSelected,
      setIsTeamSelected,
      isLeagueSelected,
      setIsLeagueSelected,
      }}>
      {children}
    </ApiContext.Provider>
  );
}
