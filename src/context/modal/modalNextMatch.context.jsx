import React, { createContext, useState, useMemo } from 'react';

export const ModalContext = createContext();

export function ModalNextMatchProvider({ children }) {

  const [modalNextMatchVisible, setModalNextMatchVisible] = useState(false);
  const [modalNextMatchContents, setModalNextMatchContents] = useState(false);

  const value = useMemo(() => ({

    modalNextMatchVisible,
    setModalNextMatchVisible,
    modalNextMatchContents,
    setModalNextMatchContents,

  }), [modalNextMatchVisible, modalNextMatchContents]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}
