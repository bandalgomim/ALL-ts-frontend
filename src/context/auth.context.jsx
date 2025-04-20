import React, { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);

  const value = useMemo(() => ({ login, setLogin }), [login]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}