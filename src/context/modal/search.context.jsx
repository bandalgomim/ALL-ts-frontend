import React, { createContext, useState, useMemo } from 'react';

export const ModalContext = createContext();

export function SearchProvider({ children }) {

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchContents, setSearchContents] = useState(false);


  const value = useMemo(() => ({
    
    searchVisible,
    setSearchVisible,
    searchContents,
    setSearchContents,
    
  }), [searchVisible, searchContents]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}
