import React, { createContext, useState, useMemo } from 'react';

export const ModalContext = createContext();

export function LogoModalProvider({ children }) {
  const [logoModalVisible, setLogoModalVisible] = useState(false);
  const [logoModalContents, setLogoModalContents] = useState(false);

  const value = useMemo(() => ({
    logoModalVisible,
    setLogoModalVisible,
    logoModalContents,
    setLogoModalContents,
  }), [logoModalVisible, logoModalContents]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}
