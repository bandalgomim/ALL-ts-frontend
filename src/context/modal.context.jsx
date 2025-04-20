import React, { createContext, useState, useMemo } from 'react';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContents, setModalContents] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchContents, setSearchContents] = useState(false);

  const value = useMemo(() => ({
    modalVisible,
    setModalVisible,
    modalContents,
    setModalContents,
    searchVisible,
    setSearchVisible,
    searchContents,
    setSearchContents }), [modalVisible, modalContents, searchVisible, searchContents]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}
