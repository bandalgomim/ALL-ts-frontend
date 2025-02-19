import React, { createContext, useReducer } from "react";
import { initialmain, initialteam, initialLeague, initialmatch } from "../reducsers/apiReducer";

export const ApiContext = createContext();


export function ApiProvider({ children }) {
  const [main, setMain] = useReducer(PostReducer, initialmain);
  const [team, setTeam] = useReducer(PostReducer, initialteam);
  const [league, setLeague] = useReducer(PostReducer, initialLeague);
  const [match, setMatch] = useReducer(PostReducer, initialmatch);
  return (
    <ApiContext.Provider value={{
      main,
      setMain,
      team,
      setTeam,
      league,
      setLeague,
      match,
      setMatch}}>
      {children}
    </ApiContext.Provider>
  );
}
