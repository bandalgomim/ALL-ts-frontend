import React, { createContext, useReducer, useMemo } from 'react';
import { PostReducer, initialmainRes } from '../reducsers/apiReducer';

export const MainContext = createContext({
  mainRes: initialmainRes,
  setMainRes: () => {},
});

export function MainProvider({ children }) {
  const [mainRes, setMainRes] = useReducer(PostReducer, initialmainRes);

  const value = useMemo(() => ({ mainRes, setMainRes }), [mainRes]);

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  );
} 