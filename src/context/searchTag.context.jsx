import React, { createContext, useState, useMemo } from 'react';

export const SearchTagContext = createContext();

export function SearchTagProvider({ children }) {
  const [searchTagRes, setSearchTagRes] = useState(null);

  const value = useMemo(() => ({ searchTagRes, setSearchTagRes }), [searchTagRes]);

  return (
    <SearchTagContext.Provider value={value}>
      {children}
    </SearchTagContext.Provider>
  );
}