import React, { createContext, useState, useMemo } from 'react';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContents, setModalContents] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchContents, setSearchContents] = useState(false);
  const [modalNextMatchVisible, setModalNextMatchVisible] = useState(false);
  const [modalNextMatchContents, setModalNextMatchContents] = useState(false);
  const [logoModalVisible, setLogoModalVisible] = useState(false);
  const [logoModalContents, setLogoModalContents] = useState(false);

  const value = useMemo(() => ({
    modalVisible,
    setModalVisible,
    modalContents,
    setModalContents,
    searchVisible,
    setSearchVisible,
    searchContents,
    setSearchContents,
    modalNextMatchVisible,
    setModalNextMatchVisible,
    modalNextMatchContents,
    setModalNextMatchContents,
    logoModalVisible,
    setLogoModalVisible,
    logoModalContents,
    setLogoModalContents
  }), [modalVisible, modalContents, searchVisible, searchContents, logoModalVisible, logoModalContents, modalNextMatchVisible, modalNextMatchContents]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}
