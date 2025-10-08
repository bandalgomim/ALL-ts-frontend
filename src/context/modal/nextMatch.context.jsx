import React, { createContext, useState, useMemo } from 'react';

export const NextMatchContext = createContext();

export function NextMatchProvider({ children }) {
  const [nextMatchVisible, setNextMatchVisible] = useState(false);
  const [nextMatchContents, setNextMatchContents] = useState(false);

  const value = useMemo(() => ({
    nextMatchVisible,
    setNextMatchVisible,
    nextMatchContents,
    setNextMatchContents,
  }), [nextMatchVisible, nextMatchContents]);

  return (
    <NextMatchContext.Provider value={value}>
      {children}
    </NextMatchContext.Provider>
  );
}