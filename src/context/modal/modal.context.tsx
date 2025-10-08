import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from 'react';
import { modalSingleReducer } from '../../reducers/modalReducer';

// --- State & Actions 타입 ---
export interface ModalState {
  visible: boolean;
  contents: any; // 필요 시 제네릭으로 확장하세요: <T = any>
}

export interface ModalActions {
  open: (payload: any) => void;   // 필요 시 제네릭으로 확장
  close: () => void;
}

// --- Context 생성 (초기값은 null, 훅에서 가드) ---
const ModalStateContext = createContext<ModalState | null>(null);
const ModalActionsContext = createContext<ModalActions | null>(null);

// --- Provider ---
export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    modalSingleReducer as React.Reducer<ModalState, any>,
    { visible: false, contents: null } as ModalState
  );

  const stateValue = useMemo<ModalState>(
    () => state,
    [state.visible, state.contents]
  );

  const actionsValue = useMemo<ModalActions>(
    () => ({
      open: (payload: any) => dispatch({ type: 'OPEN', payload }),
      close: () => dispatch({ type: 'CLOSE' }),
    }),
    []
  );

  return (
    <ModalStateContext.Provider value={stateValue}>
      <ModalActionsContext.Provider value={actionsValue}>
        {children}
      </ModalActionsContext.Provider>
    </ModalStateContext.Provider>
  );
}

// --- Hooks ---
export const useModalState = (): ModalState => {
  const ctx = useContext(ModalStateContext);
  if (!ctx) throw new Error('useModalState must be used within ModalProvider');
  return ctx;
};

export const useModalActions = (): ModalActions => {
  const ctx = useContext(ModalActionsContext);
  if (!ctx) throw new Error('useModalActions must be used within ModalProvider');
  return ctx;
};