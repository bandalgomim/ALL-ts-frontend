/*import React, { createContext, useState, useMemo } from 'react';

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
}*/

import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from 'react';
import { modalSingleReducer } from '@reducers/modalReducer';

// --- State & Actions 타입 ---
export interface LogoModalState {
  visible: boolean;
  contents: any; // 필요 시 제네릭으로 확장하세요: <T = any>
}

export interface LogoModalActions {
  open: (payload: any) => void;   // 필요 시 제네릭으로 확장
  close: () => void;
}
const LogoModalStateContext = createContext<LogoModalState | null>(null);
const LogoModalActionsContext = createContext<LogoModalActions | null>(null);

// --- Provider ---
export function LogoModalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    modalSingleReducer as React.Reducer<LogoModalState, any>,
    { visible: false, contents: null } as LogoModalState
  );

  const stateValue = useMemo<LogoModalState>(
    () => state,
    [state.visible, state.contents]
  );

  const actionsValue = useMemo<LogoModalActions>(
    () => ({
      open: (payload: any) => dispatch({ type: 'OPEN', payload }),
      close: () => dispatch({ type: 'CLOSE' }),
    }),
    []
  );

  return (
    <LogoModalStateContext.Provider value={stateValue}>
      <LogoModalActionsContext.Provider value={actionsValue}>
        {children}
      </LogoModalActionsContext.Provider>
    </LogoModalStateContext.Provider>
  );
}

export const useLogoModalState = (): LogoModalState => {
  const ctx = useContext(LogoModalStateContext);
  if (!ctx) throw new Error('useLogoModalState must be used within LogoModalProvider');
  return ctx;
};

export const useLogoModalActions = (): LogoModalActions => {
  const ctx = useContext(LogoModalActionsContext);
  if (!ctx) throw new Error('useLogoModalActions must be used within LogoModalProvider');
  return ctx;
};
