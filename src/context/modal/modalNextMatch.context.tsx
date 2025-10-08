/*import React, { createContext, useState, useMemo } from 'react';

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
}*/

import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from 'react';
import { modalSingleReducer } from '../../reducsers/modalReducer';

// --- State & Actions 타입 ---
export interface ModalNextMatchState {
  visible: boolean;
  contents: any; // 필요 시 제네릭으로 확장하세요: <T = any>
}

export interface ModalNextMatchActions {
  open: (payload: any) => void;   // 필요 시 제네릭으로 확장
  close: () => void;
}

// --- Context 생성 (초기값은 null, 훅에서 가드) ---
const ModalNextMatchStateContext = createContext<ModalNextMatchState | null>(null);
const ModalNextMatchActionsContext = createContext<ModalNextMatchActions | null>(null);

// --- Provider ---
export function ModalNextMatchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    modalSingleReducer as React.Reducer<ModalNextMatchState, any>,
    { visible: false, contents: null } as ModalNextMatchState
  );

  const stateValue = useMemo<ModalNextMatchState>(
    () => state,
    [state.visible, state.contents]
  );

  const actionsValue = useMemo<ModalNextMatchActions>(
    () => ({
      open: (payload: any) => dispatch({ type: 'OPEN', payload }),
      close: () => dispatch({ type: 'CLOSE' }),
    }),
    []
  );

  return (
    <ModalNextMatchStateContext.Provider value={stateValue}>
      <ModalNextMatchActionsContext.Provider value={actionsValue}>
        {children}
      </ModalNextMatchActionsContext.Provider>
    </ModalNextMatchStateContext.Provider>
  );
}

export const useModalNextMatchState = (): ModalNextMatchState => {
  const ctx = useContext(ModalNextMatchStateContext);
  if (!ctx) throw new Error('useModalNextMatchState must be used within ModalNextMatchProvider');
  return ctx;
};

export const useModalNextMatchActions = (): ModalNextMatchActions => {
  const ctx = useContext(ModalNextMatchActionsContext);
  if (!ctx) throw new Error('useModalNextMatchActions must be used within ModalNextMatchProvider');
  return ctx;
};
